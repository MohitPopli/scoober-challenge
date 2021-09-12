import React from "react";
import {
  Avatar,
  HeaderContainer,
  HeaderChild,
  HeadingTitle,
  TextContainer,
} from "./Header.styled";

interface HeaderProps {
  id: string;
  avatarSrc?: string;
  headerTitle: string;
  headerSubtext?: string;
  headerTitleStyles? : React.CSSProperties;
}

const Header: React.FC<HeaderProps> = ({
  id,
  avatarSrc,
  headerSubtext,
  headerTitle,
  headerTitleStyles
}) => {
  return (
    <HeaderContainer data-testid={id}>
      {avatarSrc !== undefined && (
        <Avatar data-testid={`${id}-avatar`} uri={avatarSrc} />
      )}

      <TextContainer>
        <HeadingTitle data-testid={`${id}-title`} style={headerTitleStyles}>{headerTitle}</HeadingTitle>
        {headerSubtext !== undefined && (
          <HeaderChild data-testid={`${id}-title-subtext`}>
            {headerSubtext}
          </HeaderChild>
        )}
      </TextContainer>
    </HeaderContainer>
  );
};

export default Header;
