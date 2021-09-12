import * as React from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { v4 as uuidv4 } from "uuid";
import Header from "../../components/Header/Header";
import { Attemps, Game } from "../../modals/Game";
import { User } from "../../modals/User";
import player1 from "../../assets/avatar1.png";
import {
  HomeContainer,
  HomeContainerFooter,
  HomeContentWrapper,
  StartgameButtonStyles,
  WelcomeMessage,
} from "./Home.styled";
import Button from "../../components/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { homeStateSelector } from "./store/selector";
import { newGame, setGameData, setPlayerId } from "./store/actions";
import GameDataView from "../../components/GameDataView/GameDataView";
import { GameModes } from "./store/constants";
import GameModeSelect from "../../components/GameModeSelect/GameModeSelect";
import { InstructionsList } from "../../components/Instructions/Instructions";

interface HomeProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
}

const Home: React.FC<HomeProps> = ({ socket }) => {
  const dispatch = useDispatch();
  const { gameData, playerId } = useSelector(homeStateSelector);

  const [gameMode, setGameMode] = React.useState<GameModes>(
    GameModes.SINGLE_PLAYER
  );

  React.useEffect(() => {
    if (socket !== undefined) {
      socket.on("game", (gameData: Game) => {
        dispatch(setGameData(gameData));
      });
    }
  }, [socket, dispatch]);

  const startGameHandler = React.useCallback(() => {
    if (socket !== undefined) {
      const newUser: User = {
        id: uuidv4(),
      };
      dispatch(setPlayerId(newUser.id));
      const mode = gameMode === GameModes.SINGLE_PLAYER;
      socket.emit("newgame", { user: newUser, isSingleUser: mode });
    }
  }, [socket, gameMode, dispatch]);

  const gameTurnsHandler = React.useCallback(
    (attempt: Attemps) => {
      if (socket !== undefined) {
        socket.emit("turn", attempt);
      }
    },
    [socket]
  );

  const modeChangeHandler = (selectedModeValue: string) => {
    if (selectedModeValue === GameModes.SINGLE_PLAYER) {
      setGameMode(GameModes.SINGLE_PLAYER);
    } else {
      setGameMode(GameModes.MULTI_PLAYER);
    }
  };

  const leaveGameHandler = React.useCallback(() => {
    if (socket !== undefined) {
      socket.emit("left");
    }
  }, [socket]);

  return (
    <HomeContainer>
      {gameData === undefined && (
        <>
          <Header
            id="home-header"
            headerTitle="Just Eat Takeaway Challenge"
            headerTitleStyles={{ fontWeight: "bolder" }}
          />
          <HomeContentWrapper>
            <WelcomeMessage>
              Welcome to Scoober team challenge game!!
            </WelcomeMessage>

            <InstructionsList />

            <GameModeSelect
              id="game-mode-select-control"
              onModeSelect={modeChangeHandler}
            />

            <Button
              id="start-game-button"
              onButtonClick={startGameHandler}
              isButtonDisabled={false}
              text="Start Game"
              buttonStyles={StartgameButtonStyles}
            />
          </HomeContentWrapper>
        </>
      )}
      {gameData !== undefined && (
        <>
          <Header
            id="game-header"
            avatarSrc={player1}
            headerSubtext="Win the game or win the job"
            headerTitle="Scoober Team"
          />
          <GameDataView
            gameData={gameData}
            gameMode={gameMode}
            playerId={playerId}
            onGameButtonClick={gameTurnsHandler}
            onStartNewGame={() => dispatch(newGame())}
          />

          <HomeContainerFooter>
            <Button
              id="leave-game-button"
              onButtonClick={leaveGameHandler}
              isButtonDisabled={gameData.winner !== null && gameData.winner.length !== 0}
              text="Leave Game"
              buttonStyles={StartgameButtonStyles}
            />
          </HomeContainerFooter>
        </>
      )}
    </HomeContainer>
  );
};

export default Home;
