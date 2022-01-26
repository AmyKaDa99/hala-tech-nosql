import { Schema } from "mongoose";

import ITeam from "../../interfaces/team";

import playerMatch from "./player-match";

export default new Schema<ITeam>(
  {
    name : { type: String, required: true },
    
    goal: { type: Number, required: true, default: 0 },

    players: [{ type: playerMatch, required: true }]
    
  },
  {
    _id: false,
  }
);
