import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    areaId: { type: mongoose.Schema.Types.ObjectId, ref: "Area", required: true },
    capacity: { type: Number, enum: [6, 8], required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  { timestamps: true }
);

roomSchema.virtual("availableSlots").get(function () {
  return this.capacity - this.students.length;
});

roomSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Room", roomSchema);