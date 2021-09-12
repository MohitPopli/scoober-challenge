import * as React from "react";
import { GameModes } from "../../containers/Home/store/constants";
import {
  ModesSelectionList,
  SelectionListFieldset,
  SelectionListLegend,
  SelectListOption,
} from "./GameModeSelect.styled";

interface GameModeSelectProps {
  id: string;
  onModeSelect: (mode: string) => void;
}

const GameModeSelect: React.FC<GameModeSelectProps> = ({
  id,
  onModeSelect,
}) => {
  return (
    <SelectionListFieldset>
      <SelectionListLegend>Choose Mode</SelectionListLegend>
      <ModesSelectionList
        name="game-mode"
        data-testid={id}
        autoFocus
        autoComplete="off"
        onChange={(event) => onModeSelect(event.target.value)}
      >
        <SelectListOption data-testid={`${id}-option-1`} value={GameModes.SINGLE_PLAYER}>
          PLAYER VS BOT
        </SelectListOption>
        <SelectListOption data-testid={`${id}-option-2`} value={GameModes.MULTI_PLAYER}>
          PLAYER VS PLAYER
        </SelectListOption>
      </ModesSelectionList>
    </SelectionListFieldset>
  );
};

export default GameModeSelect;
