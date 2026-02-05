import mongoose from "mongoose";

const registerKTXSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    birthDate: String,
    gender: String,
    cccd: String,
    phone: String,
    email: String,
    address: String,

    school: String,
    major: String,
    studentId: String,

    area: String,
    roomType: String,

    services: [String],

    emergencyName: String,
    emergencyPhone: String,

    avatar: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],  // chỉ cho phép 3 giá trị này
      default: "pending",                         // mặc định khi tạo mới
    },
    approvedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const RegisterKTX = mongoose.model("RegisterKTX", registerKTXSchema);

export default RegisterKTX;
