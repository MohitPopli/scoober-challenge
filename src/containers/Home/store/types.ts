import { Game } from "../../../modals/Game";

export interface HomeState {
    gameData: Game | undefined;
    playerId: string;
}