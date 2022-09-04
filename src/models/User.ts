import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user";



const userSchema: Schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Users = model<IUser>("users", userSchema)