import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mssv: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["NAM", "NU"], required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
