import styled from 'styled-components';

export const StyledButton = styled.button`
  background: #439ad4;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  color: #fff;
  font-weight: bolder;

  &:disabled {
    pointer-events: none;
    background: #c0c0c0;
  }
`;