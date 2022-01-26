import { model, Schema } from "mongoose";

import IMatch  from '../interfaces/match';

import team from "./schema/team";

const matchSchema = new Schema<IMatch> (
  
  {
    teamOne: { type: team , required: true },

    teamTwo: { type: team , required: true },

    date: { type: Date , required: true },
    
  },
  {
    versionKey: false,
  }
);

export default model<IMatch>("Match", matchSchema);
