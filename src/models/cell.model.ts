/** @format */

//DEPENDENCIES
import mongoose from 'mongoose';

//get schema from mongoose
const Schema = mongoose.Schema;

//interface for the UserSchema
export interface CellDocument extends mongoose.Document {
  type: 'code' | 'text';
  content: string;
}

//create a new instance of schema
const CellSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    content: String,
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const CellModel = mongoose.model<CellDocument>('Cell', CellSchema);

export default CellModel;
