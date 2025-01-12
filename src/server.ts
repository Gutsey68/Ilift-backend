import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { config } from './config/environment';
import { errorHandler } from './middlewares/error.handler';
import router from './routes/router';

const app = express();

//configureSecurityMiddleware(app);

app.use(
  cors({
    origin: config.client.url,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Authorization']
  })
);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.use('/api', router);
app.use('/uploads', express.static(path.join(__dirname, '..', config.upload.dir)));

app.use(errorHandler);

export default app;
