import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../../interfaces/user.interface";

export interface IUserDocument extends IUser, Document {
  _id: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export default mongoose.model<IUserDocument>("User", UserSchema);
