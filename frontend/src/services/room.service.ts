import api from "./api";
import type { Room } from "../types/room";

export const getRooms = async (): Promise<Room[]> => {
  const res = await api.get("/rooms");
  return res.data;
};

export const createRoom = async (data: {
  name: string;
  areaId: string;
  capacity: 6 | 8;
}): Promise<Room> => {
  const res = await api.post("/rooms", data);
  return res.data;
};

export const deleteRoom = async (id: string) => {
  return api.delete(`/rooms/${id}`);
};
