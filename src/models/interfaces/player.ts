
import { Document } from "mongoose";

import IPosition from "./position";

export default interface IPlayer extends Document {
  
  name: string;
  
  position: IPosition;
  
}
