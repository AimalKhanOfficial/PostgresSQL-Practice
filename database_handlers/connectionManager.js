const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
	connectionString: process.env.DB_CONNECTION_STRING || '',
	max: 20, // Maximum number of clients in the pool
	idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
	connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
	ssl: {
		rejectUnauthorized: false,  // Tembo might require this for SSL
	},
});

const openConnection = async () => await pool.connect();

const closeConnection = (client) => client.release();

module.exports = {
	openConnection,
	closeConnection
}