import type { Area } from "../types/area";

let areas: Area[] = [
  { id: 1, name: "Khu A" },
  { id: 2, name: "Khu B" },
];

export const getAreas = (): Area[] => {
  return areas;
};

export const createArea = (data: { name: string }): Area => {
  const newArea: Area = {
    id: Date.now(),
    name: data.name,
  };
  areas.push(newArea);
  return newArea;
};
