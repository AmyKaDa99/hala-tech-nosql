
import { Document } from "mongoose";

import IPlayerMatch from "./player-match";

export default interface ITeam extends Document {
  
  name: string;

  goal: number;

  players: IPlayerMatch[];

}
