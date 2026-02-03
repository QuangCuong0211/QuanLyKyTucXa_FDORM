import api from "./api";

export interface RoomPayload {
  name: string;
  areaId: number;
  capacity: number;
  price: number;
}

export const getRooms = async () => {
  const res = await api.get("/rooms");
  return res.data;
};

export const createRoom = async (data: RoomPayload) => {
  const res = await api.post("/rooms", data);
  return res.data;
};

export const updateRoom = async (id: number, data: Partial<RoomPayload>) => {
  const res = await api.put(`/rooms/${id}`, data);
  return res.data;
};

export const deleteRoom = async (id: number) => {
  await api.delete(`/rooms/${id}`);
};
