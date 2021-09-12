import * as React from "react";
import { Attemps, Game } from "../../modals/Game";
import {
  GameButtonsSection,
  GameDataWrapper,
  GameOverContentWrapper,
  GameOverImage,
  GameOverScreen,
  GameViewContainer,
  TextNode,
} from "./GameDataView.styled";
import Button from "../Button/Button";
import baloons from "../../assets/baloons.gif";
import trophy from "../../assets/trophy.gif";
import { GameModes } from "../../containers/Home/store/constants";
import SinglePlayerView from "./SinglePlayerView/SinglePlayerView";
import MultiPlayerView from "./MultiPlayerView/MultiPlayerView";
import Spinner from "../Spinner/Spinner";
import { findPlayerAttempsById, prepareAttemptData } from "./GameDataViewUtil";

export interface GameDataViewProps {
  gameData: Game;
  onGameButtonClick: (attempt: Attemps) => void;
  onStartNewGame: () => void;
  gameMode: GameModes;
  playerId: string;
}

const GameDataView: React.FC<GameDataViewProps> = ({
  gameData,
  gameMode,
  playerId,
  onGameButtonClick,
  onStartNewGame,
}) => {
  const gameContainerRef = React.useRef<HTMLDivElement>(null);

  const gameButtonHandler = React.useCallback(
    (choosenValue: string) => {
      const convertedValue = parseInt(choosenValue, 10);
      if (gameMode === GameModes.SINGLE_PLAYER) {
        const attempts = findPlayerAttempsById(gameData.attemps, playerId);
        const attempt = prepareAttemptData(
          attempts,
          convertedValue,
          gameData.id,
          gameData.playerOne
        );
        onGameButtonClick(attempt);
      } else {
        if (gameData.turn === gameData.playerOne.id) {
          const attempts = findPlayerAttempsById(
            gameData.attemps,
            gameData.playerOne.id
          );
          const attempt = prepareAttemptData(
            attempts,
            convertedValue,
            gameData.id,
            gameData.playerOne
          );
          onGameButtonClick(attempt);
        } else {
          const attempts = findPlayerAttempsById(
            gameData.attemps,
            gameData.playerTwo!.id
          );
          const attempt = prepareAttemptData(
            attempts,
            convertedValue,
            gameData.id,
            gameData.playerTwo!
          );
          onGameButtonClick(attempt);
        }
      }
    },
    [gameData, onGameButtonClick, gameMode, playerId]
  );

  const renderGameOverScreen = React.useCallback(() => {
    if (
      gameContainerRef.current !== undefined &&
      gameContainerRef.current !== null
    ) {
      const gameContainerCoords =
        gameContainerRef.current.getBoundingClientRect();
      let text = "You won";
      if (gameData.winner !== playerId) {
        text = "You lose";
      }
      return (
        <GameOverScreen
          style={{
            top: gameContainerCoords.top,
            left: gameContainerCoords.left,
          }}
        >
          <GameOverContentWrapper>
            <GameOverImage
              data-testid="icon-image"
              src={gameData.winner !== playerId ? baloons : trophy}
            />
            <TextNode data-testid="result-text">{text}</TextNode>
            <Button
              id="start-game-button"
              onButtonClick={onStartNewGame}
              isButtonDisabled={false}
              text="New game"
              value=""
              buttonStyles={{
                width: "180px",
                height: "60px",
                background: "#fff",
                borderRadius: 50,
                color: "#439ad4",
              }}
            />
          </GameOverContentWrapper>
        </GameOverScreen>
      );
    }
  }, [gameData, onStartNewGame, playerId]);

  return (
    <>
      <GameViewContainer ref={gameContainerRef}>
        <GameDataWrapper>
          {gameMode === GameModes.SINGLE_PLAYER && (
            <SinglePlayerView
              id="single-player-view"
              attempts={gameData.attemps}
              botId={gameData.playerTwo!.id}
            />
          )}
          {gameMode === GameModes.MULTI_PLAYER && (
            <>
              {gameData.playerTwo === null && <Spinner id="loading-spinner" />}
              {gameData.playerTwo !== null && (
                <MultiPlayerView
                  id="multi-player-view"
                  attempts={gameData.attemps}
                  player2Id={gameData.playerTwo.id}
                />
              )}
            </>
          )}
        </GameDataWrapper>
        <GameButtonsSection>
          <Button
            id="game-button-1"
            onButtonClick={gameButtonHandler}
            isButtonDisabled={gameData.turn !== playerId}
            text="-1"
            value="-1"
            buttonStyles={{ width: "60px", height: "60px" }}
          />

          <Button
            id="game-button-2"
            onButtonClick={gameButtonHandler}
            isButtonDisabled={gameData.turn !== playerId}
            text="0"
            value="0"
            buttonStyles={{ width: "60px", height: "60px" }}
          />
          <Button
            id="game-button-3"
            onButtonClick={gameButtonHandler}
            isButtonDisabled={gameData.turn !== playerId}
            text="1"
            value="1"
            buttonStyles={{ width: "60px", height: "60px" }}
          />
        </GameButtonsSection>
      </GameViewContainer>
      {gameData.winner !== null && renderGameOverScreen()}
    </>
  );
};

export default GameDataView;
