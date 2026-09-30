import express from 'express';
import patients from '../data/patients.ts';
import { v1 as uuid } from 'uuid';
import type { Patient } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patients);
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body as Partial<Patient, 'id'>;

  const newPatient = {
    id: uuid(),
    name: name ?? '',
    dateOfBirth: dateOfBirth ?? '',
    ssn: ssn ?? '',
    gender: gender ?? '',
    occupation: occupation ?? '',
  };

  res.send(newPatient);
});

export default router;
