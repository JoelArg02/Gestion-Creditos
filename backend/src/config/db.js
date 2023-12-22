const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'creditos',
    port: 5432
});

pool.query('SELECT * FROM usuarios', (err, results) => {
  // ...
});


module.exports = pool;
