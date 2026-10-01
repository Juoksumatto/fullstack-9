import express from 'express';
import patients from '../data/patients.ts';
import { v1 as uuid } from 'uuid';
import { Gender, type Patient } from '../types.ts';

const router = express.Router();

const isGender = (gender: unknown): gender is Patient['gender'] => {
  return Object.values(Gender).some((validGender) => validGender === gender);
};

router.get('/', (_req, res) => {
  res.send(patients);
});

router.post('/', (req, res) => {
  try {
    const body: unknown = req.body;

    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
      return res.status(400).send({ error: 'Request body must be an object' });
    }

    const { name, dateOfBirth, ssn, gender, occupation } = body as Record<string, unknown>;

    if (
      typeof name !== 'string' ||
      typeof dateOfBirth !== 'string' ||
      typeof ssn !== 'string' ||
      typeof occupation !== 'string' ||
      name.trim() === '' ||
      dateOfBirth.trim() === '' ||
      ssn.trim() === '' ||
      occupation.trim() === '' ||
      !isGender(gender)
    ) {
      return res.status(400).send({ error: 'Incorrect or missing patient data' });
    }

    const newPatient: Patient = {
      id: uuid(),
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
    };
    patients.push(newPatient);
    res.send(newPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

export default router;