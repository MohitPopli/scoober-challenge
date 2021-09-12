import { findPlayerAttempsById, prepareAttemptData } from "./GameDataViewUtil";
import { v4 as uuidv4 } from "uuid";
import { Attemps } from "../../modals/Game";

describe("findPlayerAttempsById", () => {
  test("should return empty array if no attempts were made", () => {
    expect(findPlayerAttempsById([], uuidv4())).toEqual([]);
  });

  test("should return last attempt made by player", () => {
    const playerId = uuidv4();
    const gameId = uuidv4();
    const attempts: Array<Attemps> = [
      {
        user: { id: playerId },
        number: 1,
        newValue: 0,
        oldValue: 0,
        text: "",
        gameId: gameId,
      },
      {
        user: { id: uuidv4() },
        number: -1,
        newValue: 10,
        oldValue: 89,
        text: "[(1 + 89)/3 = 9.8292]",
        gameId: gameId,
      },
      {
        user: { id: playerId },
        number: 0,
        newValue: 11,
        oldValue: 56,
        text: "[(1 + 56)/3 = 9.8292]",
        gameId: gameId,
      },
    ];
    expect(findPlayerAttempsById(attempts, playerId)).toEqual([
      {
        user: { id: playerId },
        number: 0,
        newValue: 11,
        oldValue: 56,
        text: "[(1 + 56)/3 = 9.8292]",
        gameId: gameId,
      },
    ]);
  });
});

describe("prepareAttemptData", () => {
  test("should return attempt data if initially it was empty", () => {
    expect(prepareAttemptData([], 0, uuidv4(), { id: uuidv4() })).toMatchObject(
      {
        user: { id: expect.any(String) },
        number: 0,
        newValue: 0,
        oldValue: 0,
        text: "",
        gameId: expect.any(String),
      }
    );
  });

  test("should return attempt data is present", () => {
    const playerId = uuidv4();
    expect(
      prepareAttemptData(
        [
          {
            user: { id: playerId },
            number: 0,
            newValue: 11,
            oldValue: 56,
            text: "[(1 + 56)/3 = 9.8292]",
            gameId: uuidv4(),
          },
        ],
        1,
        uuidv4(),
        { id: uuidv4() }
      )
    ).toMatchObject({
      user: { id: expect.any(String) },
      number: 1,
      newValue: 11,
      oldValue: 56,
      text: "[(1 + 56)/3 = 9.8292]",
      gameId: expect.any(String),
    });
  });
});
