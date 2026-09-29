import express from 'express';
import patients from '../data/patients.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patients);
});

router.post('/', (_req, res) => {
  res.send('Saving a pationt!');
});

export default router;