import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export default model('Person', new Schema({
  id: { type: Number, unique: true },
  name: { type: String },
  email: { type: String, unique: true },
  doc_number: { type: String, unique: true },
}));
