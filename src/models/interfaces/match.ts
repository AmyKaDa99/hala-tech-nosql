
import { Document } from "mongoose";

import ITeam from "./team";

export default interface IMatch extends Document {
  
  teamOne: ITeam;
  
  teamTwo: ITeam;

  date: Date;
  
}
