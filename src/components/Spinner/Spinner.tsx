import * as React from "react";
import { SpinnerOverlay } from "./Spinner.styled";

interface SpinnerProps {
  id: string;
}

const Spinner: React.FC<SpinnerProps> = ({ id }) => {
  return (
    <>
      <SpinnerOverlay data-testid={id} />
      <span>Please wait while other player joins...</span>
    </>
  );
};

export default Spinner;
