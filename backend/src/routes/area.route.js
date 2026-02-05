import express from "express";
import {
  getAreas,
  createArea,
  deleteArea,
} from "../controllers/area.controller.js";

const router = express.Router();

router.get("/", getAreas);
router.post("/", createArea);
router.delete("/:id", deleteArea);

export default router;
