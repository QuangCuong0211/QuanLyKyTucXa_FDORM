import type { Room } from "../types/room";

let rooms: Room[] = [
  {
    id: 1,
    name: "P101",
    areaId: 1,
    capacity: 6,
    occupied: 4,
  },
];

export const getRooms = (): Room[] => {
  return rooms;
};

export const addRoom = (data: Omit<Room, "id">): Room => {
  const newRoom: Room = {
    id: Date.now(),
    ...data,
  };
  rooms.push(newRoom);
  return newRoom;
};
