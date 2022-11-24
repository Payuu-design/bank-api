import { Router } from 'express';
import pay from './pay.routes.js';
import checkBalance from './checkBalance.routes.js';
import checkCard from './checkCard.routes.js';
import card from './person.routes.js';
import person from './card.routes.js';

const router = Router();

router.use('/pay', pay);
router.use('/check-balance', checkBalance);
router.use('/check-card', checkCard);

router.use('/card', card);
router.use('/person', person);

export default router;
