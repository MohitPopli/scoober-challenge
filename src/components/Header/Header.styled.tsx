import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #439ad4;
  height: 80px;
  width: 70%;
  box-shadow: 0 6px 10px -4px #a9a9a9;
  padding: 0.5rem;
`;

interface AvatarSource {
  uri: string;
}

export const Avatar = styled.div<AvatarSource>`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  background-image: url(${(props) => props.uri});
  background-repeat: round;
`;

export const TextContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

export const HeadingTitle = styled.h2`
  color: #fff;
  margin-block-start: 0.4em;
  margin-block-end: 0em;
  margin-inline-start: 30px;
  font-weight: normal;
`;

export const HeaderChild = styled.h5`
  color: #fff;
  margin-block-start: 0.5em;
  margin-block-end: 1em;
  margin-inline-start: 31px;
  font-weight: normal;
`;
