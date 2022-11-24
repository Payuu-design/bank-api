import Transaction from '../models/transaction.model.js';

export async function readOne (req, res) {
    const { id } = req.params;
    try {
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            return res.status(404).json({ message: `Transaction with id ${id} not found` });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function readMany (_, res) {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function deleteOne (req, res) {
    const { id } = req.params;

    try {
        await Transaction.deleteOne({ id });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(200).json({ message: 'OK' });
}

export async function deleteAll (_, res) {
    try {
        await Transaction.deleteMany({});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(200).json({ message: 'OK' });
}
