import RegisterKTX from "../models/registerktx.model.js";

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
