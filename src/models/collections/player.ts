import { model, Schema } from "mongoose";

import IPlayer from "../interfaces/player";

const playerSchema = new Schema<IPlayer> (
  
  {
    name: { type: String , required: true },

    position: {type: Schema.Types.ObjectId, ref: 'Position' },

    
  },
  {
    versionKey: false,
  }
);

export default model<IPlayer>("Player", playerSchema);
