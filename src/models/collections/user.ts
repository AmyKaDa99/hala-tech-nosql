import { model, Schema } from "mongoose";

import IUser from "../interfaces/user";

const userSchema = new Schema<IUser> (
  
  {
    username: { type: String , required: true },   

    password: { type: String , required: true }    
  },
  {
    versionKey: false,
  }
);

export default model<IUser>("User", userSchema);
