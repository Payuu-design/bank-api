import { Router } from "express";
import checkBalance from '../controllers/checkBalance.controllers.js';

const router = Router();

router.post('/', checkBalance);

export default router;
