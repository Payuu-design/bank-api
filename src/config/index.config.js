import { config } from 'dotenv';

config();

// app
export const PORT = process.env.PORT || 4000;
export const NODE_ENV = process.env.NODE_ENV || 'development';

// db
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://user:pass@host:port';
