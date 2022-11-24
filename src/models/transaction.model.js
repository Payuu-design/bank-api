import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export default model('Transaction', new Schema({
    ref_number: { type: String, unique: true },
    successful: { type: Boolean },
    effective_date: { type: Date, default: new Date() },
    amount: { type: Number },
    charge: { type: Number },
    num_installments: { type: Number },
    fulfilled: { type: Boolean }
}));
