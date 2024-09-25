const { Client } = require('pg');

const dbConfig = {
    user: 'postgres',
    password: 'azerty',
    host: 'localhost',
    port: 5433,
    database: 'projet1'
};

const client = new Client(dbConfig);
module.exports = client;
