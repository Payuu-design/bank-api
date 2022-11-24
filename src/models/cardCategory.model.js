import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export default model('Card_Category', new Schema({
  id: { type: Number, unique: true },
  card_category: { type: String, unique: true },
}));
