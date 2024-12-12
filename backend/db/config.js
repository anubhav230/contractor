// db.js
require('dotenv').config();  // Load environment variables from .env file

const { Pool } = require('pg');

// Set up PostgreSQL connection pool using local environment variables
const pool = new Pool({
  user: "postgres",        // From .env file
  host: "localhost",        // 'localhost'
  database: "contractor", // From .env file
  password: "12345", // From .env file
  port: 5432,        // '5432' (default PostgreSQL port)
});

module.exports = pool;

