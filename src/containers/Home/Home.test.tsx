import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Home from "./Home";
import socketIOClient from "socket.io-client";
import MockedSocket from "socket.io-mock";
import { setPlayerId } from "./store/actions";
import { v4 as uuidv4 } from "uuid";
import userEvent from "@testing-library/user-event";
import { Game } from "../../modals/Game";

jest.mock("socket.io-client");

describe("Home tests", () => {
  const socket = new MockedSocket();

  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("render home component with start screen", () => {
    const mockStore = configureMockStore();

    const store = mockStore({
      home: {
        playerId: "",
        gameData: undefined,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <Home socket={socket} />
      </Provider>
    );

    expect(screen.getByTestId(/home-header-title/i)).toHaveTextContent(
      "Just Eat Takeaway Challenge"
    );

    // start game
    fireEvent.click(
      container.querySelector("#start-game-button") as HTMLButtonElement
    );
    expect(store.getActions()[0]).toEqual(setPlayerId(expect.any(String)));
    socket.socketClient.emit("newgame", {
      user: { id: uuidv4() },
      isSingleUser: true,
    });
  });

  test("user should be able to change game mode", () => {
    const mockStore = configureMockStore();

    const store = mockStore({
      home: {
        playerId: "",
        gameData: undefined,
      },
    });

    render(
      <Provider store={store}>
        <Home socket={socket} />
      </Provider>
    );

    userEvent.selectOptions(
      screen.getByTestId("game-mode-select-control"),
      "MULTI_PLAYER"
    );
    expect(
      (screen.getByText("PLAYER VS BOT") as HTMLOptionElement).selected
    ).toBeFalsy();
    expect(
      (screen.getByText("PLAYER VS PLAYER") as HTMLOptionElement).selected
    ).toBeTruthy();

    // change back to single player mode
    userEvent.selectOptions(
      screen.getByTestId("game-mode-select-control"),
      "SINGLE_PLAYER"
    );
    expect(
      (screen.getByText("PLAYER VS BOT") as HTMLOptionElement).selected
    ).toBeTruthy();
    expect(
      (screen.getByText("PLAYER VS PLAYER") as HTMLOptionElement).selected
    ).toBeFalsy();
  });

  test("render view when game data is available", () => {
    const mockStore = configureMockStore();
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

    const store = mockStore({
      home: {
        playerId: player1Id,
        gameData: mockGameData,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <Home socket={socket} />
      </Provider>
    );

    expect(screen.getByTestId("game-header-title")).toHaveTextContent(
      "Scoober Team"
    );
    expect(screen.getByTestId("game-header-title-subtext")).toHaveTextContent(
      "Win the game or win the job"
    );

    expect(container.querySelector("#leave-game-button")).toBeInTheDocument();
  });
});
