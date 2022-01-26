
import { Document } from "mongoose";

export default interface IPlayerMatch extends Document {
  
  id: number;
  
  name: string;

  position: string;

}
