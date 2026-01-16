type Id = string | number;
interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface User extends Coordinates {
  id: Id;
  chat_id: Id;
}
