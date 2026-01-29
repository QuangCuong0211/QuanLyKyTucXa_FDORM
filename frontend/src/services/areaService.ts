import type { Area } from "../types/area";

let areas: Area[] = [
  { id: 1, name: "Khu A", description: "Khu nam" },
  { id: 2, name: "Khu B", description: "Khu nữ" },
];

export const getAreas = () => areas;

export const addArea = (area: Omit<Area, "id">) => {
  const newArea = { id: Date.now(), ...area };
  areas.push(newArea);
  return newArea;
};
