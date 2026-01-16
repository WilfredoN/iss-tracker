export type Id = string | number;
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface User extends Coordinates {
  id: Id;
  chat_id: Id;
  login: string;
}
