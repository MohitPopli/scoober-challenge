import * as React from "react";
import {
  Instruction,
  InstructionsHeader,
  IntructionsList,
} from "./Instructions.styled";

export const InstructionsList = () => {
  return (
    <>
      <InstructionsHeader>Instructions:</InstructionsHeader>
      <IntructionsList>
        <Instruction>
          If any player reaches number <b>1</b> will be winner in any mode.
        </Instruction>
        <Instruction>
          If any player reaches number <b>divisible by 3</b> will be winner in
          any mode.
        </Instruction>
      </IntructionsList>
    </>
  );
};
