import Card from '../models/card.model.js';

export async function createOne (req, res) {
    const { id, owner, person_id, exp_month, exp_year, cvv, balance, card_number, 
        card_category_id, card_type_id } = req.body
    
    if (!id || !owner || !person_id || !exp_month || !exp_year || !cvv || !balance 
        || !card_number || !card_category_id || !card_type_id) {

        return res.status(400).json({ message: 'Missing parameters' });
    }

    try {
        await Card.create({
            id, owner, person_id, exp_month, exp_year, cvv, balance, card_number,
            card_category_id, card_type_id
        })
    } catch (err) {
        console.log(err);
        if(err.code === 11000) {
            return res.status(400).json({ message: 'Card already exists' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(201).json({ id })
}

export async function deleteOne (req, res) {
    const { id } = req.params;

    try {
        await Card.deleteOne({ id });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(200).json({ message: 'OK' });
}

export async function deleteAll (_, res) {
    try {
        await Card.deleteMany({});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(200).json({ message: 'OK' });
}
