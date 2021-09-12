import { Attemps } from "../../modals/Game";
import { User } from "../../modals/User";

/**
 * This method returns last attemp of player by player id.
 * @param data Array of attempts made by player
 * @param playerId Id of the player for which we need attempt
 * @returns Array of last attempt made by player
 */

export const findPlayerAttempsById = (
  data: Array<Attemps>,
  playerId: string
) => {
  const filteredAttempts = data.filter((item) => item.user.id === playerId);
  if (filteredAttempts.length > 0) {
    return filteredAttempts.slice(-1);
  }
  return filteredAttempts;
};

/**
 * This method prepares the attempt data to be sent to server for calculations.
 * @param data Attempts data made by player in last round
 * @param choosenValue Value selected by the player to make this attempt
 * @param gameId Game id associated with the attempts
 * @param userData User id and name (if present) to be sent to server
 * @returns Attempts object to be sent to server
 */
export const prepareAttemptData = (
  data: Array<Attemps>,
  choosenValue: number,
  gameId: string,
  userData: User
) => {
  if (data.length === 0) {
    const attempt: Attemps = {
      user: userData,
      number: choosenValue,
      newValue: 0,
      oldValue: 0,
      text: "",
      gameId: gameId,
    };
    return attempt;
  }
  const playerData = data[0];
  const attempt: Attemps = {
    ...playerData,
    number: choosenValue,
    gameId: gameId,
  };
  return attempt;
};
