// app.js
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js'; 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Email Validation Service API!' });
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

export default app;