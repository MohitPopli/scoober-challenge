import styled from "styled-components";

export const GameDataContent = styled.div`
  padding: 0.5rem;
  display: flex;
`;

export const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
`;

export const TextContent = styled.div`
  display: flex;
  min-width: 200px;
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 6px;
  margin: 0.2rem;
`;

interface AvatarSource {
  uri: string;
}

export const Avatar = styled.div<AvatarSource>`
  margin: 0.5rem;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  background-image: url(${(props) => props.uri});
  background-repeat: round;
`;

export const GameViewContainer = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  background-color: #f2f5f9;
  padding: 0.5rem;
  justify-content: space-between;
`;

export const GameDataWrapper = styled.div`
  max-height: calc(100vh - 20rem);
  min-height: calc(100vh - 20rem);
  display: flex;
  overflow-y: auto;
  align-content: flex-start;
  flex-direction: column;
`;

export const GameButtonsSection = styled.footer`
  display: flex;
  justify-content: space-around;
`;

export const GameOverScreen = styled.div`
  position: fixed;
  display: block;
  width: 69.5%;
  height: 74%;
  right: 0px;
  bottom: 0px;
  background-color: rgb(67, 154, 212, 0.8);
  z-index: 2;
`;

export const GameOverContentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const TextNode = styled.h1`
  color: #fff;
  font-size: 3rem;
`;

export const GameOverImage = styled.img`
  width: 450px;
`;
