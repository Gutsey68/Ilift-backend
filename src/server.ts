import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import router from './routes/router';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('hello from express');
  res.status(200).json({ message: 'Hello World!' });
});

app.use('/api', router);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Erreur Interne du Serveur',
    error: err.message
  });
});

export default app;
