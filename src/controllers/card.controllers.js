import Card from '../models/card.model.js';

export async function readOne (req, res) {
    const { id } = req.params;
    try {
        const card = await Card.findById(id);
        if (!card) {
            return res.status(404).json({ message: `Card with id ${id} not found` });
        }
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function readMany (_, res) {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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
