import api from "./api";
import type { Student, CreateStudent } from "../types/students";

export const getStudents = async (): Promise<Student[]> => {
  const res = await api.get("/students");
  return res.data;
};

export const createStudent = async (
  data: CreateStudent
): Promise<Student> => {
  const res = await api.post("/students", data);
  return res.data;
};

export const deleteStudent = async (id: string) => {
  return api.delete(`/students/${id}`);
};
