import api from "./api";

export const getStudents = async () => {
  const res = await api.get("/students");
  return res.data;
};

export const createStudent = async (data: any) => {
  return api.post("/students", data);
};

export const deleteStudent = async (id: string) => {
  return api.delete(`/students/${id}`);
};
