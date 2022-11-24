import { Router } from "express";
import { readOne, readMany, createOne, deleteOne, deleteAll } from '../controllers/card.controllers.js';

const router = Router();

router.get('/:id', readOne);
router.get('/', readMany);
router.post('/', createOne);
router.delete('/:id', deleteOne);
router.delete('/', deleteAll);

export default router;
