import express from 'express';
import patients from '../data/patients.ts';
import { v1 as uuid } from 'uuid';

interface PatientInput {
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patients);
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body as Partial<PatientInput>;

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