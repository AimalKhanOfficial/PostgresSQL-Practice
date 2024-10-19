const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING || '',
    ssl: {
        rejectUnauthorized: false,
    },
});

client
	.connect()
	.then(() => {
		console.log('>> Connected to PostgreSQL database');
	})
	.catch((err) => {
		console.error('>> Error connecting to PostgreSQL database', err);
	});