import { Router } from 'express';
import pay from './pay.routes.js';
import checkBalance from './checkBalance.routes.js';
import checkCard from './checkCard.routes.js';
import card from './person.routes.js';
import person from './card.routes.js';

const router = Router();

app.use('/pay', pay);
app.use('/check-balance', checkBalance);
app.use('/check-card', checkCard);

app.use('/card', card);
app.use('/person', person);

export default router;
