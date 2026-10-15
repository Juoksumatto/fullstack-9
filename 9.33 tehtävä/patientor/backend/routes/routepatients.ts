import express from 'express';
import patients from '../data/patients.ts';
import { v1 as uuid } from 'uuid';
import { Gender, type Patient } from '../types.ts';
import { z } from 'zod';

const router = express.Router();

const isGender = (gender: unknown): gender is Patient['gender'] => {
  return Object.values(Gender).some((validGender) => validGender === gender);
};

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(['male', 'female', 'other']),
  occupation: z.string(),
});

const newEntrySchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('HealthCheck'),
    date: z.string(),
    specialist: z.string(),
    description: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
    healthCheckRating: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
  }),
  z.object({
    type: z.literal('OccupationalHealthcare'),
    date: z.string(),
    specialist: z.string(),
    description: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
    employerName: z.string(),
    sickLeave: z.object({ startDate: z.string(), endDate: z.string() }).optional(),
  }),
  z.object({
    type: z.literal('Hospital'),
    date: z.string(),
    specialist: z.string(),
    description: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
    discharge: z.object({ date: z.string(), criteria: z.string() }),
  }),
]);

router.get('/', (_req, res) => {
  res.send(
    patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }))
  );
});

router.get('/:id', (req, res) => {
  const patient = patients.find((p) => p.id === req.params.id);
  if (patient) {
    return res.send(patient);
  } else {
    return res.status(404).send({ error: 'Patient not found' });
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patients.find((p) => p.id === req.params.id);
  if (!patient) {
    return res.status(404).send({ error: 'Patient not found' });
  }

  const result = newEntrySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).send({ error: 'Incorrect or missing entry data' });
  }

  const newEntry: Patient['entries'][number] = {
    ...result.data,
    id: uuid(),
  };
  patient.entries.push(newEntry);
  return res.status(201).send(newEntry);
});

router.post('/', (req, res) => {
  try {
    const result = newPatientSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).send({ error: 'Incorrect or missing patient data' });
    }

    const { name, dateOfBirth, ssn, gender, occupation } = result.data;

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
      entries: []
    };

    patients.push({ ...newPatient, entries: [] });
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