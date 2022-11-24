import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/index.routes.js';
import './services/db.js';

const app = express();

app.set('json spaces', 2);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.get('/', (_, res) => res.status(200).json({
    message: 'Welcome to the Bank API',
}));
app.use(routes);

export default app;
