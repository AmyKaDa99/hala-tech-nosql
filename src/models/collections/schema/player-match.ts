import { Schema } from "mongoose";

import IPlayerMatch from "../../interfaces/player-match";

export default new Schema<IPlayerMatch>(
  {
    id : { type: Number, required: true, unique: true },

    name : { type: String, required: true },
    
    position: { type: String, required: true },
    
  },
  {
    _id: false,
  }
);
