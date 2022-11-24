import { Router } from "express";
import checkCard from '../controllers/checkCard.controllers.js';

const router = Router();

router.post('/', checkCard);

export default router;
