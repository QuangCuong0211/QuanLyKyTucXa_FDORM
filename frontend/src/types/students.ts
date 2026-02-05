export interface Student {
  _id: string;
  code: string;
  name: string;
  gender: "NAM" | "NU";
  roomId?: {
    _id: string;
    name: string;
  };
}
