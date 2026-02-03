import { Router } from "express";
import multer from "multer";
import path from "path";

import {
  getRegisterKTX,
  getRegisterKTXById,
  addRegisterKTX,
} from "../controllers/registerktx.controller.js";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/", getRegisterKTX);

router.get("/:id", getRegisterKTXById);

router.post("/", upload.single("avatar"), addRegisterKTX);

export default router;
