import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (Number.isNaN(height) || Number.isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = (req.body ?? {}) as {
    daily_exercises?: unknown;
    target?: unknown;
  };

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  const isNumberLike = (value: unknown): value is number | string =>
    (typeof value === 'number' || typeof value === 'string') && !Number.isNaN(Number(value));

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.length === 0 ||
    !daily_exercises.every(isNumberLike) ||
    !isNumberLike(target)
  ) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  res.json(calculateExercises(daily_exercises.map(Number), Number(target)));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
