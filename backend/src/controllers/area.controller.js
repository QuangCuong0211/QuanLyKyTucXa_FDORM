import Area from "../models/area.model.js";

// GET ALL
export const getAreas = async (req, res) => {
  try {
    const areas = await Area.find();
    res.json(areas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
export const createArea = async (req, res) => {
  try {
    console.log("BODY:", req.body); 
    const area = await Area.create(req.body);
    res.status(201).json(area);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message,
      errors: err.errors,
    });
  }
};

// DELETE
export const deleteArea = async (req, res) => {
  try {
    const area = await Area.findByIdAndDelete(req.params.id);

    if (!area) {
      return res.status(404).json({ message: "Không tìm thấy khu" });
    }

    res.json({ message: "Xóa khu thành công" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
