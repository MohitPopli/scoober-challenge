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
import logo from "../../../assets/logo.png";

interface SinglePlayeViewProps {
  id: string;
  attempts: Array<Attemps>;
  botId: string;
}

const SinglePlayerView: React.FC<SinglePlayeViewProps> = ({
  id,
  attempts,
  botId,
}) => {
  const renderData = () => {
    return (
      <>
        {attempts.map((attempt, index) => {
          if (attempt.user.id === botId) {
            return (
              <GameDataContent
                key={`${attempt.user.id}-${index}`}
                style={{ transform: "scaleX(-1)" }}
                data-testid={`${id}-bot-content`}
              >
                <Avatar uri={logo} />
                <ContentSection>
                  <Button
                    isButtonDisabled
                    id="player-data-button"
                    onButtonClick={/* istanbul ignore next */ () => undefined}
                    text={attempt.number.toString()}
                    buttonStyles={{
                      width: "60px",
                      height: "60px",
                      transform: "scaleX(-1)",
                      background: "#439ad4",
                    }}
                  />
                  <TextContent
                    data-testid={`${id}-attempt-bot-text`}
                    style={{ transform: "scaleX(-1)" }}
                  >
                    {attempt.text}
                  </TextContent>
                  <TextContent
                    data-testid={`${id}-attempt-bot-value`}
                    style={{ transform: "scaleX(-1)" }}
                  >
                    {attempt.newValue}
                  </TextContent>
                </ContentSection>
              </GameDataContent>
            );
          }
          return (
            <GameDataContent
              key={`${attempt.user.id}-${index}`}
              data-testid={`${id}-player-content`}
            >
              <Avatar uri={player1} />
              <ContentSection>
                <Button
                  isButtonDisabled
                  id="player-data-button"
                  onButtonClick={/* istanbul ignore next */ () => undefined}
                  text={attempt.number.toString()}
                  buttonStyles={{
                    width: "60px",
                    height: "60px",
                    background: "#439ad4",
                  }}
                />
                <TextContent data-testid={`${id}-attempt-player1-text`}>
                  {attempt.text}
                </TextContent>
                <TextContent data-testid={`${id}-attempt-player1-value`}>
                  {attempt.newValue}
                </TextContent>
              </ContentSection>
            </GameDataContent>
          );
        })}
      </>
    );
  };
  return <>{renderData()}</>;
};

export default SinglePlayerView;
