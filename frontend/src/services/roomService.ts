import type { Room } from "../types/room";

let rooms: Room[] = [
  { id: 1, name: "A101", areaId: 1, capacity: 6, occupied: 4 },
];

export const getRooms = () => rooms;

export const addRoom = (room: Omit<Room, "id">) => {
  const newRoom = { id: Date.now(), ...room };
  rooms.push(newRoom);
  return newRoom;
};
