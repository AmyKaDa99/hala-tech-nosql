import { model, Schema } from "mongoose";

import IPosition from "../interfaces/position";

const positionSchema = new Schema<IPosition> (
  
  {
    position: { type: String , required: true }    
  },
  {
    versionKey: false,
  }
);

export default model<IPosition>("Position", positionSchema);
