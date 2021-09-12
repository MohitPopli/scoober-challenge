import React from "react";
import { StyledButton } from "./Button.styled";

export interface ButtonProps {
  id: string;
  isButtonDisabled: boolean;
  text: string;
  onButtonClick: (value: string) => void;
  buttonStyles?: React.CSSProperties;
  value?: string;
}

const Button: React.FC<ButtonProps> = ({
  id,
  value,
  isButtonDisabled,
  text,
  onButtonClick,
  buttonStyles,
}) => {
  return (
    <StyledButton
      id={id}
      value={value}
      onClick={(ev) => onButtonClick(ev.currentTarget.value)}
      disabled={isButtonDisabled}
      style={buttonStyles}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
