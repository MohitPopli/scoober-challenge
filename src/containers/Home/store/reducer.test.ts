import { Game } from "../../../modals/Game";
import { newGame, setGameData, setPlayerId } from "./actions";
import { homeReducer, initialState } from "./reducer";
import { v4 as uuidv4 } from "uuid";

describe("Home reducer tests", () => {
  const rootState = initialState;
  test("should return the initial state", () => {
    const mockAction: any = {
      type: "none",
      payload: "",
    };
    expect(homeReducer(rootState, mockAction)).toEqual(rootState);
  });

  test("SET_GAME_DATA", () => {
    const player1Id = uuidv4();
    const mockGameData: Game = {
      id: uuidv4(),
      startingNumber: 12,
      value: 2,
      winner: "",
      attemps: [],
      playerOne: { id: player1Id },
      playerTwo: { id: uuidv4() },
      turn: player1Id,
    };
    expect(homeReducer(rootState, setGameData(mockGameData))).toEqual({
      ...rootState,
      gameData: mockGameData,
    });
  });

  test("SET_PLAYER_ID", () => {
    const player1Id = uuidv4();
    expect(homeReducer(rootState, setPlayerId(player1Id))).toEqual({
      ...rootState,
      playerId: player1Id,
    });
  });

  test("NEW_GAME", () => {
    const player1Id = uuidv4();
    expect(homeReducer(rootState, newGame())).toEqual({
      ...rootState,
      playerId: "",
      gameData: undefined,
    });
  });
});
