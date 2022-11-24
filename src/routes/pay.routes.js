import { Router } from "express";
import pay from '../controllers/pay.controllers.js'

const router = Router();

router.post('/', pay);

export default router;