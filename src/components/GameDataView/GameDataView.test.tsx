import { render, screen, fireEvent } from "@testing-library/react";
import { Attemps, Game } from "../../modals/Game";
import GameDataView, { GameDataViewProps } from "./GameDataView";
import { v4 as uuidv4 } from "uuid";
import { GameModes } from "../../containers/Home/store/constants";

describe("Game data view tests", () => {
  const onGameButtonClick = jest.fn();
  const onStartNewGame = jest.fn();
  const player1Id = uuidv4();
  const player2Id = uuidv4();
  const gameId = uuidv4();

  const mockGameData: Game = {
    id: gameId,
    startingNumber: 12,
    value: 2,
    winner: "",
    attemps: [],
    playerOne: { id: player1Id },
    playerTwo: { id: player2Id },
    turn: "",
  };

  const getComponent = (props: Partial<GameDataViewProps>) =>
    render(
      <GameDataView
        gameData={mockGameData}
        gameMode={GameModes.SINGLE_PLAYER}
        playerId={player1Id}
        onGameButtonClick={onGameButtonClick}
        onStartNewGame={onStartNewGame}
        {...props}
      />
    );

  beforeEach(() => jest.clearAllMocks());

  test("should render view for single player mode", () => {
    const cloneGameData = {
      ...mockGameData,
      attemps: [
        {
          user: { id: player1Id },
          number: 1,
          newValue: 0,
          oldValue: 0,
          text: "[(1 + 9)/3 = 1.82]",
          gameId: gameId,
        },
        {
          user: { id: player2Id, username: "cpu" },
          number: -1,
          newValue: 10,
          oldValue: 89,
          text: "[(1 + 89)/3 = 9.8292]",
          gameId: gameId,
        },
      ],
    };
    const { container } = getComponent({
      gameData: cloneGameData,
      playerId: player1Id,
    });
    expect(
      screen.getByTestId(/single-player-view-player-content/i)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(/single-player-view-bot-content/i)
    ).toBeInTheDocument();

    expect(
      screen.getByTestId(/single-player-view-attempt-player1-text/i)
    ).toHaveTextContent("[(1 + 9)/3 = 1.82]");
    expect(
      screen.getByTestId(/single-player-view-attempt-player1-value/i)
    ).toHaveTextContent("0");

    expect(
      screen.getByTestId(/single-player-view-attempt-bot-text/i)
    ).toHaveTextContent("[(1 + 89)/3 = 9.8292]");
    expect(
      screen.getByTestId(/single-player-view-attempt-bot-value/i)
    ).toHaveTextContent("10");

    // turns buttons are disabled
    expect(
      container.querySelector("#game-button-1")?.getAttribute("disabled")
    ).toStrictEqual("");
    expect(
      container.querySelector("#game-button-2")?.getAttribute("disabled")
    ).toStrictEqual("");
    expect(
      container.querySelector("#game-button-3")?.getAttribute("disabled")
    ).toStrictEqual("");
  });

  test("should render loader until second player joins game in multiplayer mode", () => {
    const cloneGameData = {
      ...mockGameData,
      playerTwo: null,
    };
    getComponent({
      gameData: cloneGameData,
      playerId: player1Id,
      gameMode: GameModes.MULTI_PLAYER,
    });

    expect(screen.getByTestId(/loading-spinner/i)).toBeInTheDocument();
  });

  test("should render game in multiplayer view", () => {
    const cloneGameData = {
      ...mockGameData,
      player2: { id: player2Id },
      turn: player2Id,
      attemps: [
        {
          user: { id: player1Id },
          number: 1,
          newValue: 0,
          oldValue: 0,
          text: "[(1 + 9)/3 = 1.82]",
          gameId: gameId,
        },
        {
          user: { id: player2Id },
          number: -1,
          newValue: 10,
          oldValue: 89,
          text: "[(1 + 89)/3 = 9.8292]",
          gameId: gameId,
        },
      ],
    };
    const { container } = getComponent({
      gameData: cloneGameData,
      playerId: player2Id,
      gameMode: GameModes.MULTI_PLAYER,
    });

    expect(
      screen.getByTestId(/multi-player-view-player1-content/i)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(/multi-player-view-player2-content/i)
    ).toBeInTheDocument();

    expect(
      screen.getByTestId(/multi-player-view-attempt-player1-text/i)
    ).toHaveTextContent("[(1 + 9)/3 = 1.82]");
    expect(
      screen.getByTestId(/multi-player-view-attempt-player1-value/i)
    ).toHaveTextContent("0");

    expect(
      screen.getByTestId(/multi-player-view-attempt-player2-text/i)
    ).toHaveTextContent("[(1 + 89)/3 = 9.8292]");
    expect(
      screen.getByTestId(/multi-player-view-attempt-player2-value/i)
    ).toHaveTextContent("10");

    // turns buttons are disabled
    expect(
      container.querySelector("#game-button-1")?.getAttribute("disabled")
    ).toBeNull();
    expect(
      container.querySelector("#game-button-2")?.getAttribute("disabled")
    ).toBeNull();
    expect(
      container.querySelector("#game-button-3")?.getAttribute("disabled")
    ).toBeNull();
  });

  test("should invoke onGameButtonClick for single player mode", () => {
    const cloneGameData = {
      ...mockGameData,
      turn: player1Id,
    };
    const { container } = getComponent({
      gameData: cloneGameData,
      playerId: player1Id,
    });

    fireEvent.click(
      container.querySelector("#game-button-1") as HTMLButtonElement
    );

    const expectedObject: Attemps = {
      user: { id: expect.any(String) },
      number: -1,
      newValue: 0,
      oldValue: 0,
      text: "",
      gameId: expect.any(String),
    };

    expect(onGameButtonClick).toHaveBeenCalledTimes(1);
    expect(onGameButtonClick).toHaveBeenCalledWith(expectedObject);
  });

  test("should invoke onGameButtonClick for multi player mode with player1 turn", () => {
    const cloneGameData = {
      ...mockGameData,
      player2: { id: player2Id },
      turn: player1Id,
    };
    const { container } = getComponent({
      gameData: cloneGameData,
      playerId: player1Id,
      gameMode: GameModes.MULTI_PLAYER,
    });

    fireEvent.click(
      container.querySelector("#game-button-1") as HTMLButtonElement
    );

    const expectedObject: Attemps = {
      user: { id: player1Id },
      number: -1,
      newValue: 0,
      oldValue: 0,
      text: "",
      gameId: gameId,
    };

    expect(onGameButtonClick).toHaveBeenCalledTimes(1);
    expect(onGameButtonClick).toHaveBeenCalledWith(expectedObject);
  });

  test("should invoke onGameButtonClick for multi player mode with player2 turn", () => {
    const cloneGameData = {
      ...mockGameData,
      player2: { id: player2Id, username: "" },
      turn: player2Id,
      attemps: [
        {
          user: { id: player1Id },
          number: 1,
          newValue: 0,
          oldValue: 0,
          text: "[(1 + 9)/3 = 1.82]",
          gameId: gameId,
        },
      ],
    };
    const { container } = getComponent({
      gameData: cloneGameData,
      playerId: player2Id,
      gameMode: GameModes.MULTI_PLAYER,
    });

    fireEvent.click(
      container.querySelector("#game-button-1") as HTMLButtonElement
    );

    const expectedObject: Attemps = {
      user: { id: player2Id },
      number: -1,
      newValue: 0,
      oldValue: 0,
      text: "",
      gameId: gameId,
    };

    expect(onGameButtonClick).toHaveBeenCalledTimes(1);
    expect(onGameButtonClick).toHaveBeenCalledWith(expectedObject);
  });

  test("should render gameover screen for losing player", () => {
    const { rerender } = getComponent({
      playerId: player2Id,
      gameMode: GameModes.MULTI_PLAYER,
    });

    const cloneGameData = {
      ...mockGameData,
      player2: { id: player2Id, username: "" },
      winner: player1Id,
    };
    rerender(
      <GameDataView
        gameData={cloneGameData}
        gameMode={GameModes.MULTI_PLAYER}
        playerId={player2Id}
        onGameButtonClick={onGameButtonClick}
        onStartNewGame={onStartNewGame}
      />
    );

    expect(screen.getByTestId(/result-text/i)).toHaveTextContent("You lose");
    expect(screen.getByTestId(/icon-image/i).getAttribute("src")).toEqual(
      "baloons.gif"
    );
  });

  test("should render gameover screen for winning player", () => {
    const { rerender, container } = getComponent({
      playerId: player1Id,
      gameMode: GameModes.MULTI_PLAYER,
    });

    const cloneGameData = {
      ...mockGameData,
      player2: { id: player2Id, username: "" },
      winner: player1Id,
    };
    rerender(
      <GameDataView
        gameData={cloneGameData}
        gameMode={GameModes.MULTI_PLAYER}
        playerId={player1Id}
        onGameButtonClick={onGameButtonClick}
        onStartNewGame={onStartNewGame}
      />
    );

    expect(screen.getByTestId(/result-text/i)).toHaveTextContent("You won");
    expect(screen.getByTestId(/icon-image/i).getAttribute("src")).toEqual(
      "trophy.gif"
    );

    // should be able to start new game
    fireEvent.click(
      container.querySelector("#start-game-button") as HTMLButtonElement
    );

    expect(onStartNewGame).toHaveBeenCalledTimes(1);
  });
});
