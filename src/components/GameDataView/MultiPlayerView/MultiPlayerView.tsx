import * as React from "react";
import { Attemps } from "../../../modals/Game";
import Button from "../../Button/Button";
import {
  GameDataContent,
  Avatar,
  ContentSection,
  TextContent,
} from "../GameDataView.styled";
import player1 from "../../../assets/player1.png";
import player2 from "../../../assets/player2.png";

interface MultiPlayerViewProps {
  attempts: Array<Attemps>;
  player2Id: string;
}

const MultiPlayerView: React.FC<MultiPlayerViewProps> = ({
  attempts,
  player2Id,
}) => {
  const renderMultiPlayerData = () => {
    return (
      <>
        {attempts.map((attempt, index) => {
          if (attempt.user.id === player2Id) {
            return (
              <GameDataContent
                key={`${attempt.user.id}-${index}`}
                style={{ transform: "scaleX(-1)" }}
              >
                <Avatar uri={player2} />
                <ContentSection>
                  <Button
                    isButtonDisabled
                    id="player-data-button"
                    onButtonClick={() => undefined}
                    text={attempt.number.toString()}
                    buttonStyles={{
                      width: "60px",
                      height: "60px",
                      transform: "scaleX(-1)",
                      background: "#439ad4",
                    }}
                  />
                  <TextContent style={{ transform: "scaleX(-1)" }}>
                    {attempt.text}
                  </TextContent>
                  <TextContent style={{ transform: "scaleX(-1)" }}>
                    {attempt.newValue}
                  </TextContent>
                </ContentSection>
              </GameDataContent>
            );
          }
          return (
            <GameDataContent key={`${attempt.user.id}-${index}`}>
              <Avatar uri={player1} />
              <ContentSection>
                <Button
                  isButtonDisabled
                  id="player-data-button"
                  onButtonClick={() => undefined}
                  text={attempt.number.toString()}
                  buttonStyles={{
                    width: "60px",
                    height: "60px",
                    background: "#439ad4",
                  }}
                />
                <TextContent>{attempt.text}</TextContent>
                <TextContent>{attempt.newValue}</TextContent>
              </ContentSection>
            </GameDataContent>
          );
        })}
      </>
    );
  };

  return <>{renderMultiPlayerData()}</>;
};

export default MultiPlayerView;
