import { ActionType } from "typesafe-actions";
import produce, { Draft } from "immer";
import * as homeActions from "./actions";
import { HomeState } from "./types";
import { HomeActionTypes } from "./constants";

export type HomeActions = ActionType<typeof homeActions>;

export const initialState: HomeState = {
  gameData: undefined,
  playerId: "",
};

export const homeReducer = (
  state: HomeState = initialState,
  action: HomeActions
): HomeState => {
  switch (action.type) {
    case HomeActionTypes.SET_GAME_DATA: {
      return produce(state, (draft: Draft<HomeState>) => {
        draft.gameData = action.payload;
      });
    }

    case HomeActionTypes.NEW_GAME: {
      return produce(state, (draft: Draft<HomeState>) => {
        draft.gameData = undefined;
        draft.playerId = ''
      });
    }

    case HomeActionTypes.SET_PLAYER_ID: {
      return produce(state, (draft: Draft<HomeState>) => {
        draft.playerId = action.payload;
      });
    }

    default:
      return state;
  }
};
