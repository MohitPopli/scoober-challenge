import { User } from "./User";

export interface Game {
  id: string;
  startingNumber: number;
  value: number;
  winner: string;
  attemps: Array<Attemps>;
  playerOne: User;
  playerTwo: User;
  turn: string;
}

export interface Attemps {
  user: User;
  number: number;
  newValue: number;
  oldValue: number;
  text: string;
  gameId: string;
}
