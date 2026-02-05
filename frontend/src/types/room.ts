export interface Room {
  _id: string;
  name: string;
  areaId: {
    _id: string;
    name: string;
  };
  capacity: 6 | 8;
  students: any[];
  currentCount: number;
  remaining: number;
  status: "Còn trống" | "Đã đầy";
}
