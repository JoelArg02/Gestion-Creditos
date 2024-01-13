const { Pool } = require('pg');
const pool = new Pool({
    // host: 'localhost',
    // user: 'postgres',
    // password: 'password',
    // database: 'creditos',
    // port: 5432
    host: 'app-2cf3716b-887f-4f7f-97c3-32a1d4b91f35-do-user-15528195-0.c.db.ondigitalocean.com', // Use the provided host
    user: 'creditos', // Use the provided username
    password: 'AVNS_K6BZUZ8nQccCjaA4J25', // Use the provided password
    database: 'creditos', // Use the provided database name
    port: 25060, // Use the provided port
    ssl: {
        rejectUnauthorized: false // Set to false if using self-signed certificates, otherwise remove this line
    }
});

module.exports = pool;