import type { Room } from "./room";

export interface Student {
  _id: string;
  name: string;
  mssv: string;
  gender: "NAM" | "NU";
  roomId: Room; // populate
}

export type CreateStudent = {
  name: string;
  mssv: string;
  gender: "NAM" | "NU";
  roomId: string;
};
