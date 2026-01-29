require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "fdorm-secret-key-change-in-production";
const DATA_FILE = path.join(__dirname, "data", "db.json");

// Đảm bảo thư mục data tồn tại
if (!fs.existsSync(path.join(__dirname, "data"))) {
  fs.mkdirSync(path.join(__dirname, "data"), { recursive: true });
}

function readDB() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (e) {
    return { users: [], areas: [], rooms: [], registrations: [] };
  }
}

function writeDB(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

// Khởi tạo admin mặc định (mật khẩu: 123456)
function ensureAdmin() {
  const db = readDB();
  const hasAdmin = db.users.some((u) => u.role === "admin");
  if (!hasAdmin) {
    const hash = bcrypt.hashSync("123456", 10);
    db.users.push({
      id: uuidv4(),
      email: "admin@ktx.vn",
      password: hash,
      fullName: "Quản trị viên",
      role: "admin",
      createdAt: new Date().toISOString(),
    });
    writeDB(db);
    console.log("Đã tạo tài khoản admin: admin@ktx.vn / 123456");
  }
}

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10mb" }));

// --- Middleware xác thực ---
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Chưa đăng nhập" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Chưa đăng nhập" });
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Không có quyền truy cập" });
    next();
  };
}

// --- Auth API ---
app.post("/api/auth/register", async (req, res) => {
  const { email, password, fullName } = req.body;
  if (!email || !password || !fullName)
    return res.status(400).json({ message: "Thiếu email, mật khẩu hoặc họ tên" });
  const db = readDB();
  if (db.users.some((u) => u.email === email))
    return res.status(400).json({ message: "Email đã được sử dụng" });
  const hash = bcrypt.hashSync(password, 10);
  const user = {
    id: uuidv4(),
    email,
    password: hash,
    fullName,
    role: "student",
    createdAt: new Date().toISOString(),
  };
  db.users.push(user);
  writeDB(db);
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.status(201).json({
    message: "Đăng ký thành công",
    token,
    user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
  });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Thiếu email hoặc mật khẩu" });
  const db = readDB();
  const user = db.users.find((u) => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.json({
    message: "Đăng nhập thành công",
    token,
    user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
  });
});

app.get("/api/auth/me", authMiddleware, (req, res) => {
  const db = readDB();
  const user = db.users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "Không tìm thấy user" });
  res.json({
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    },
  });
});

// --- Areas API (chỉ admin/staff) ---
app.get("/api/areas", (req, res) => {
  const db = readDB();
  res.json(db.areas || []);
});

app.post("/api/areas", authMiddleware, requireRole("admin", "staff"), (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: "Thiếu tên khu" });
  const db = readDB();
  const area = {
    id: uuidv4(),
    name,
    description: description || "",
    createdAt: new Date().toISOString(),
  };
  db.areas.push(area);
  writeDB(db);
  res.status(201).json(area);
});

app.put("/api/areas/:id", authMiddleware, requireRole("admin", "staff"), (req, res) => {
  const { name, description } = req.body;
  const db = readDB();
  const idx = db.areas.findIndex((a) => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Không tìm thấy khu" });
  if (name) db.areas[idx].name = name;
  if (description !== undefined) db.areas[idx].description = description;
  writeDB(db);
  res.json(db.areas[idx]);
});

app.delete("/api/areas/:id", authMiddleware, requireRole("admin", "staff"), (req, res) => {
  const db = readDB();
  const idx = db.areas.findIndex((a) => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Không tìm thấy khu" });
  db.areas.splice(idx, 1);
  writeDB(db);
  res.json({ message: "Đã xóa khu" });
});

// --- Rooms API ---
app.get("/api/rooms", (req, res) => {
  const db = readDB();
  const { areaId } = req.query;
  let list = db.rooms || [];
  if (areaId) list = list.filter((r) => r.areaId === areaId);
  res.json(list);
});

app.post("/api/rooms", authMiddleware, requireRole("admin", "staff"), (req, res) => {
  const { areaId, name, capacity } = req.body;
  if (!areaId || !name || !capacity)
    return res.status(400).json({ message: "Thiếu areaId, name hoặc capacity" });
  const db = readDB();
  const room = {
    id: uuidv4(),
    areaId,
    name,
    capacity: Number(capacity),
    currentOccupancy: 0,
    status: "available",
    createdAt: new Date().toISOString(),
  };
  db.rooms.push(room);
  writeDB(db);
  res.status(201).json(room);
});

app.put("/api/rooms/:id", authMiddleware, requireRole("admin", "staff"), (req, res) => {
  const { name, capacity, status } = req.body;
  const db = readDB();
  const idx = db.rooms.findIndex((r) => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Không tìm thấy phòng" });
  if (name) db.rooms[idx].name = name;
  if (capacity !== undefined) db.rooms[idx].capacity = Number(capacity);
  if (status) db.rooms[idx].status = status;
  writeDB(db);
  res.json(db.rooms[idx]);
});

app.delete("/api/rooms/:id", authMiddleware, requireRole("admin", "staff"), (req, res) => {
  const db = readDB();
  const idx = db.rooms.findIndex((r) => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Không tìm thấy phòng" });
  db.rooms.splice(idx, 1);
  writeDB(db);
  res.json({ message: "Đã xóa phòng" });
});

// --- Registrations (đăng ký ở KTX) ---
app.get("/api/registrations", (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const db = readDB();
  let list = db.registrations || [];
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded.role === "student")
        list = list.filter((r) => r.userId === decoded.id);
    } catch (_) {}
  }
  res.json(list);
});

app.post("/api/registrations", authMiddleware, (req, res) => {
  const body = req.body;
  const db = readDB();
  const reg = {
    id: uuidv4(),
    userId: req.user.id,
    status: "pending",
    fullName: body.fullName,
    birthDate: body.birthDate,
    gender: body.gender,
    cccd: body.cccd,
    phone: body.phone,
    email: body.email,
    address: body.address,
    school: body.school,
    major: body.major,
    studentId: body.studentId,
    areaId: body.areaId,
    roomId: body.roomId || null,
    roomType: body.roomType,
    services: body.services || [],
    emergencyName: body.emergencyName,
    emergencyPhone: body.emergencyPhone,
    avatar: body.avatar || null,
    createdAt: new Date().toISOString(),
  };
  db.registrations = db.registrations || [];
  db.registrations.push(reg);
  writeDB(db);
  res.status(201).json(reg);
});

app.patch("/api/registrations/:id", authMiddleware, requireRole("admin", "staff"), (req, res) => {
  const { status } = req.body;
  const db = readDB();
  const idx = (db.registrations || []).findIndex((r) => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Không tìm thấy đơn" });
  if (status) db.registrations[idx].status = status;
  writeDB(db);
  res.json(db.registrations[idx]);
});

// Health
app.get("/", (req, res) => {
  res.json({ message: "Backend KTX đang chạy" });
});

ensureAdmin();
app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
