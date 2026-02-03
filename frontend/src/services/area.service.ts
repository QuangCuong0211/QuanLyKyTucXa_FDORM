import api from "./api";
import type { Area } from "../types/area";

export const getAreas = async (): Promise<Area[]> => {
  const res = await api.get("/areas");
  return res.data;
};

export const createArea = async (data: Omit<Area, "id">): Promise<Area> => {
  const res = await api.post("/areas", data);
  return res.data;
};

export const deleteArea = async (id: number) => {
  return api.delete(`/areas/${id}`);
};
