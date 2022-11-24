import Card from '../models/card.model.js'
import Person from '../models/person.model.js'
import Transaction from '../models/transaction.model.js'
import { compare } from '../utils/bcrypt.utils.js'

export default async function (req, res) {
    console.log('NEW PAYMENT REQUEST, req id:', req.id);
    const { owner, email, doc_number, amount, card_type_id, card_number, exp_month, exp_year, cvv,
        card_category_id, num_installments, ref_number } = req.body

    // create minimal data response
    const data = {
        ref_number, amount, num_installments,
        // 'charge': amount / (card_type_id == 1 ? num_installments : 1),
        'successful': false,
        'fulfilled': false,
        'effective_date': new Date().toISOString()
    };

    // basic validations
    if (!owner || !email || !doc_number || !amount || !card_type_id || !card_number || !exp_month ||
        !exp_year || !cvv || !card_category_id || !num_installments || !ref_number) {

        return res.status(400).json({
            message: 'Error', reason: 'Data received was not enough to process transaction', data
        });
    }
    if (amount <= 0) return res.status(400).json({
        message: 'Error', reason: 'Amount must be greater than zero', data
    });
    if (num_installments <= 0) return res.status(400).json({
        message: 'Error', reason: 'Dues must be greater than zero', data
    });

    // check if transaction with given ref_number was already processed before
    let tran;
    try {
        tran = await Transaction.findOne({ ref_number });
    } catch (err) {
        return res.status(500).json({ message: 'Error', reason: 'Internal server error', data });
    }
    // console.log('ref_number', ref_number);
    // console.log('tran', tran);
    if (tran) return res.status(400).json({
        message: 'OK',
        reason: 'Transaction already processed',
        data: { ...tran._doc, effective_date: tran.effective_date.toISOString() }
    });

    try {
        const card = await Card.findOne({ card_number });
        if (!card) return res.status(400).json({
            message: 'Error', reason: 'Card does not exist in database', data
        });

        const person = await Person.findOne({ doc_number });
        if (!person) {
            return res.status(400).json({
                message: 'Error', reason: 'Person with this document number does not exist in database', data
            });
        }
        if (person.email !== email) {
            return res.status(400).json({
                message: 'Error', reason: 'Person email doesn\'t match', data
            });
        }
        if (card.owner !== owner) {
            return res.status(400).json({
                message: 'Error', reason: 'Person does not own this card', data
            });
        }
        if (card.card_type_id !== card_type_id || card.card_category_id !== card_category_id) {
            return res.status(400).json({ message: 'Error', reason: 'Bad type or category', data });
        }

        if (card.exp_month !== exp_month || card.exp_year !== exp_year || !compare(card.cvv, cvv)) {
            return res.status(400).json({ message: 'Error', reason: 'Bad expiration date or cvv', data });
        }
        if (card.balance >= amount) {
            data.charge = amount / (card_type_id == 1 ? num_installments : 1);
        } else {
            if(card.card_type_id == 1) { // credit card
                data.charge = card.balance; // charge all available amount
            } else {
                return res.status(400).json({ message: 'Error', reason: 'Insufficient charge', data });
            }
        }
        tran = await Transaction.create({ ...data, effective_date: new Date() });
        // tran = new Transaction({ ...data, effective_date: new Date() });

        const cardUni = await Card.findOne({ id: 999 });

        card.balance -= parseInt(tran.charge);
        cardUni.balance += amount;
        await card.save();
        await cardUni.save();
        tran.successful = true;
        if (tran.amount === tran.charge) tran.fulfilled = true;
        await tran.save();
        console.log('ok 3');
        return res.status(200).json({ message: 'OK', reason: 'Transaccion successful', data: tran });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error', reason: 'Internal bank error', data });
    }
}
