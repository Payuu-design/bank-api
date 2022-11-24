import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/index.config.js';

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	// connectTimeoutMS: 10000,
};

(async () => {
	try {
		const db = await mongoose.connect(MONGODB_URI, options);
		console.log(`Connection to database ${db.connection.name} successful`)

		db.connection.on('error', err => {
			console.log(`Database connection error: ${err}`);
		});

		db.connection.on('disconnected', () => {
			console.log('Database disconnected');
		});
	} catch(err) {
		console.log('Couldn\'t connect to database', err);
	}
})();
