import Card from '../models/card.model.js'

export default async function (req, res) {
    const { owner, card_type_id, card_number } = req.body
    if (!owner || !card_type_id || !card_number) {
        return res.status(400).json({ message: 'Missing parameters' });
    }

    let card;
    try {
        card = await Card.findOne({ owner, card_type_id, card_number });
    } catch (err) {
        return res.status(500).json({ err })
    }
    if (!card) return res.status(404).json({ message: 'Card not found' })

    return res.status(200).json({ message: 'OK' });
}
