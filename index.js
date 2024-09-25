const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./src/routes/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev')).use(bodyParser.json());

app.use('/api', userRoutes);

app.use(({ res }) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.';
    res.status(404).json({ message });
});

app.get('/', (req, res) => res.send('Hello World'));

app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}`));
