import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export default model('Card_Type', new Schema({
  id: { type: Number, unique: true },
  card_type: { type: String, unique: true },
}));
