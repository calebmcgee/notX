require('dotenv').config();
const { Pool } = require('[g');

module.exports = new Pool ({
    connectionString: process.env.DATABASE_URL
});

/* To load .env variables in shell session and run schema.sql, creating the db structure
CREATE DATABASE ---
export $(cat .env| xargs)
echo $DATABASE_URL
psql $DATABASE_URL -f src/db/schema.sql

*/