const { Pool } = require('pg');
const pool = new Pool({
    host: '157.230.144.235',
    user: 'postgres',
    password: 'password',
    database: 'creditos',
    port: 5432
});

module.exports = pool;
