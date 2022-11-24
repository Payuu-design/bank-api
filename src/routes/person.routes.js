import { Router } from "express";
import { createOne, deleteOne, deleteAll } from '../controllers/person.controllers.js';

const router = Router();

router.post('/', createOne);
router.delete('/:id', deleteOne);
router.delete('/', deleteAll);

export default router;
