import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export default model('Card', new Schema({
  id: { type: Number, unique: true },
  person_id: { type: Number, ref: 'Person' },
  card_category_id: { type: Number, ref: 'Card_Category' },
  card_type_id: { type: Number, ref: 'Card_Type' },
  card_number: { type: String, unique: true },
  owner: { type: String },
  exp_month: { type: String },
  exp_year: { type: String },
  cvv: { type: String },
  balance: { type: Number },
}));
