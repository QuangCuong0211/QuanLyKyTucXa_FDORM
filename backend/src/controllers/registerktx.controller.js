import RegisterKTX from "../models/registerktx.model.js";
import fs from "fs";          // ← thêm import fs để xóa file avatar nếu cần
import path from "path";

export async function getRegisterKTX(req, res) {
  try {
    const data = await RegisterKTX.find().sort({ createdAt: -1 });

    return res.json({
      data,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function addRegisterKTX(req, res) {
  try {
    const body = {
      ...req.body,
      avatar: req.file ? "/uploads/" + req.file.filename : "",
    };

    const newData = await RegisterKTX.create(body);

    return res.status(201).json({
      message: "Đăng ký thành công",
      data: newData,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export async function deleteRegisterKTX(req, res) {
  try {
    const register = await RegisterKTX.findById(req.params.id);

    if (!register) {
      return res.status(404).json({ message: "Không tìm thấy đơn đăng ký với ID này" });
    }

    // Nếu có avatar, xóa file ảnh trên server (tùy chọn, tránh rác file)
    if (register.avatar) {
      const filePath = path.join(process.cwd(), register.avatar);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Đã xóa file avatar: ${filePath}`);
      }
    }

    // Xóa document trong MongoDB
    await RegisterKTX.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Xóa đơn đăng ký thành công",
      deletedId: req.params.id,
    });
  } catch (error) {
    console.error("Lỗi khi xóa đơn đăng ký:", error);
    return res.status(500).json({ message: error.message });
  }
}

export async function updateRegisterKTX(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Debug: in ra dữ liệu frontend gửi
    console.log("PATCH /registerktx/:id nhận được:", { id, updates });

    let finalUpdates = { ...updates };

    // Nếu duyệt approved → tự động set approvedAt
    if (updates.status === "approved") {
      finalUpdates.approvedAt = new Date();
    }

    const updated = await RegisterKTX.findByIdAndUpdate(
      id,
      { $set: finalUpdates },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy đơn đăng ký" });
    }

    res.status(200).json({
      message: updated.status === "approved" ? "Đã phê duyệt thành công" : "Cập nhật thành công",
      data: updated
    });
  } catch (error) {
    console.error("Lỗi update registerKTX:", error);
    res.status(500).json({ message: error.message });
  }
}
