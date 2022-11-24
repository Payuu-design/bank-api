import { Router } from "express";
import { readOne, readMany, deleteOne, deleteAll } from '../controllers/transaction.controllers.js';

const router = Router();

router.get('/:id', readOne);
router.get('/', readMany);
router.delete('/:id', deleteOne);
router.delete('/', deleteAll);

export default router;
