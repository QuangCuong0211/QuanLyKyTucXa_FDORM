export interface Room {
  _id: string;
  name: string;
  capacity: number;
  areaId: {
    _id: string;
    name: string;
  };
}
