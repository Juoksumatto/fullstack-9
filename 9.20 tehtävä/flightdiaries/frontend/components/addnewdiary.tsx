import { useState, type SubmitEvent } from 'react';
import type { NewDiaryEntry, Visibility, Weather } from '../src/types';

interface Props {
  onCancel: () => void;
  onSubmit: (diary: NewDiaryEntry) => Promise<void>;
}

const weatherOptions: Weather[] = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'];
const visibilityOptions: Visibility[] = ['great', 'good', 'ok', 'poor'];

const AddNewDiary = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>('sunny');
  const [visibility, setVisibility] = useState<Visibility>('great');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addDiary = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      await onSubmit({ date, weather, visibility });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add diary');
    }
  };

  return (
    <form onSubmit={(event) => void addDiary(event)}>
      <h2>Add a new diary</h2>
      <label>
        Date:
        <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
      </label>
      <label>
        Weather:
        <select value={weather} onChange={(event) => setWeather(event.target.value as Weather)}>
          {weatherOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </label>
      <label>
        Visibility:
        <select value={visibility} onChange={(event) => setVisibility(event.target.value as Visibility)}>
          {visibilityOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </label>
      <label>
        Comment:
        <input value={comment} onChange={(event) => setComment(event.target.value)} />
      </label>
      {error && <p role="alert">{error}</p>}
      <button type="submit">Add</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default AddNewDiary;
