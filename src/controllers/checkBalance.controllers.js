import Card from '../models/card.model.js'

export default async function (req, res) {
    const { cards } = req.body
    if (!cards) return res.status(400).json({ message: 'Missing parameters' });

    let cardsFound;
    try {
        cardsFound = await Card.find({
            card_number: { $in: cards.map(card => card.card_number) },
        }).select('amount owner card_number card_type_id');
    } catch (err) {
        return res.status(500).json({ err })
    }
    if (cards.length !== cardsFound.length) return res.status(400).json({
        message: `Error: ${cards.length - cardsFound.length} tarjetas solicitadas no encontradas`
    });

    const ok = cards.every(card => {
        const cardFound = cardsFound.find(c => c.card_number === card.card_number);
        if (!cardFound) return false;
        return cardFound.owner === card.owner && cardFound.card_type_id === card.card_type_id;
    });

    if (!ok) return res.status(400).json({ message: 'Error: tarjetas no coinciden' });

    return res.status(200).json({
        message: 'OK',
        balances: cardsFound.map(({ amount, card_number }) => ({ amount, card_number }))
    });
}
