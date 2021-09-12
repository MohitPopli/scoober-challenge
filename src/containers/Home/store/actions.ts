import { action } from "typesafe-actions";
import { Game } from "../../../modals/Game";
import { HomeActionTypes } from "./constants";

export const setGameData = (data: Game) =>
  action(HomeActionTypes.SET_GAME_DATA, data);

export const newGame = () => action(HomeActionTypes.NEW_GAME);

export const setPlayerId = (playerId: string) =>
  action(HomeActionTypes.SET_PLAYER_ID, playerId);
