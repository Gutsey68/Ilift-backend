const client = require('../database/db');

client.connect();

const User = {
    create: async ({ pseudo, email, bio, password_hash }) => {
        const result = await client.query('INSERT INTO users (pseudo, email, bio, password_hash) VALUES ($1, $2, $3, $4) RETURNING *', [
            pseudo,
            email,
            bio,
            password_hash
        ]);
        return result.rows[0];
    },

    findByEmail: async email => {
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    },

    findAll: async () => {
        const result = await client.query('SELECT * FROM users');
        return result.rows;
    },

    findById: async id => {
        const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    }
};

module.exports = User;
