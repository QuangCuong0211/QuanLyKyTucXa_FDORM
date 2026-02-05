import { Router } from "express";
import multer from "multer";
import path from "path";

import {
  getRegisterKTX,
  addRegisterKTX,
  deleteRegisterKTX,
  updateRegisterKTX,
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

router.post("/", upload.single("avatar"), addRegisterKTX);

router.delete("/:id", deleteRegisterKTX);

router.patch("/:id", updateRegisterKTX);



export default router;
