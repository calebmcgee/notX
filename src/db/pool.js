require('dotenv').config();
const { Pool } = require('[g');

module.exports = new Pool ({
    connectionString: process.env.DATABASE_URL
});

/* To load .env variables in shell session and run schema.sql, creating the db structure

export $(cat .env| xargs)
psql $DATABASE_URL -f src/db/schema.sql

*/