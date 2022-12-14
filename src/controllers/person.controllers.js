import Person from '../models/person.model.js';

export async function readOne (req, res) {
    const { id } = req.params;
    try {
        const person = await Person.findById(id);
        if (!person) {
            return res.status(404).json({ message: `Person with id ${id} not found` });
        }
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function readMany (_, res) {
    try {
        const persons = await Person.find();
        res.status(200).json(persons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function createOne (req, res) {
    const { id, name, email, doc_number } = req.body;

    if (!id || !name || !email || !doc_number) {
        return res.status(400).json({ message: 'Missing parameters' });
    }

    try {
        await Person.create({ id, name, email, doc_number });
    } catch (err) {
        console.log(err);
        if(err.code === 11000) {
            return res.status(400).json({ message: 'Person already exists' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(201).json({ id });
}

export async function deleteOne (req, res) {
    const { id } = req.params;

    try {
        await Person.deleteOne({ id });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(200).json({ message: 'OK' });
}

export async function deleteAll (_, res) {
    try {
        await Person.deleteMany({});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(200).json({ message: 'OK' });
}
