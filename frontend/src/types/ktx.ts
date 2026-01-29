export interface Area {
  id: number;
  name: string;
  description?: string;
}

export interface Room {
  id: number;
  name: string;
  areaId: number;
  capacity: number;
  currentStudents: number;
  status: "available" | "full";
}
