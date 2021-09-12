import { createSelector, createStructuredSelector } from "reselect";
import { ApplicationRootState } from "../../../rootTypes";

const selectHomeState = (state: ApplicationRootState) => {
  return state.home;
};

const selectGameData = () =>
  createSelector(selectHomeState, (state) => state.gameData);

const selectPlayerId = () =>
  createSelector(selectHomeState, (state) => state.playerId);

const homeStateSelector = createStructuredSelector({
  gameData: selectGameData(),
  playerId: selectPlayerId(),
});

export { homeStateSelector };
