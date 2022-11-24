import { Router } from 'express';
import pay from './pay.routes.js';
import checkBalance from './checkBalance.routes.js';
import checkCard from './checkCard.routes.js';
import person from './person.routes.js';
import card from './card.routes.js';
import transaction from './transaction.routes.js';

const router = Router();

router.use('/pay', pay);
router.use('/check-balance', checkBalance);
router.use('/check-card', checkCard);

router.use('/cards', card);
router.use('/persons', person);
router.use('/transactions', transaction);

export default router;
