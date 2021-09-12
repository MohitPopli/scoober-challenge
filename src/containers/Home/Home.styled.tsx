import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

export const HomeContentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  box-shadow: 1px 4px 10px 2px rgba(18, 7, 7, 0.5);
  width: 70%;
  padding: 0.5rem;
  height: 70vh;
  align-items: center;
`;

export const WelcomeMessage = styled.h1`
  color: #000;
`;

export const StartgameButtonStyles: React.CSSProperties = {
  fontWeight: "bold",
  fontSize: "20px",
  borderRadius: "10px",
  width: "150px",
};

export const HomeContainerFooter = styled.footer`
  padding: 1rem;
`;
