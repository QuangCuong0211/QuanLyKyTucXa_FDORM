import type { Student } from "../types/students";

const API = "http://localhost:3000/api/students";

export const getStudents = async (): Promise<Student[]> => {
  const res = await fetch(API);
  return res.json();
};

export const createStudent = async (data: Omit<Student, "id">) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Phòng đã đầy");
  return res.json();
};

export const deleteStudent = async (id: number) => {
  await fetch(`${API}/${id}`, { method: "DELETE" });
};
