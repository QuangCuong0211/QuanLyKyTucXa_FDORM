import type { Area, Room } from "../types/ktx";

export const areas: Area[] = [
  { id: 1, name: "Khu A", description: "Khu nam" },
  { id: 2, name: "Khu B", description: "Khu nữ" }
];

export const rooms: Room[] = [
  { id: 1, name: "A101", areaId: 1, capacity: 6, currentStudents: 4, status: "available" },
  { id: 2, name: "A102", areaId: 1, capacity: 6, currentStudents: 6, status: "full" }
];
