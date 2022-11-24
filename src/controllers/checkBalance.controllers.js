import Card from '../models/card.model.js'

export default async function (req, res) {
    const { card } = req.body
    if (!card) return res.status(400).json({ message: 'Missing parameters' });

    let cardFound;
    try {
        cardFound = await Card.find({ card_number: card.card_number })
            .select('amount owner card_number card_type_id');
    } catch (err) {
        return res.status(500).json({ err })
    }

    if (cardFound.owner !== card.owner || cardFound.card_type_id !== card.card_type_id) {
        return res.status(400).json({ message: 'Error: tarjetas no coinciden' });
    }

    return res.status(200).json({
        message: 'OK',
        balance: cardFound.amount
    });
}
