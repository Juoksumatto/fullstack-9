import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnosesroute.ts';
import patientRouter from './routes/routepatients.ts';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});