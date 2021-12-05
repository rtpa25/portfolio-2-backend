/** @format */

//DEPENDENCIES
import mongoose from 'mongoose';

//get schema from mongoose
const Schema = mongoose.Schema;

//interface for the UserSchema
export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

//create a new instance of schema
const UserSchema = new Schema({}, { timestamps: true });

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
