import express from 'express';
import diagnosesData from '../data/diagnoses.ts';
import type { Diagnosis } from '../types.ts';

const router = express.Router();
const diagnoses: Diagnosis[] = diagnosesData;

router.get('/', (_req, res) => {
  res.send(diagnoses);
});

export default router;