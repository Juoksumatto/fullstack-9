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
      await onSubmit({ date, weather, visibility, comment });
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
      <fieldset>
        <legend>Weather</legend>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {weatherOptions.map((option) => (
          <div key={option}>
            <input
              type="radio"
              id={`weather-${option}`}
              name="weather"
              value={option}
              checked={weather === option}
              onChange={(event) => setWeather(event.currentTarget.value as Weather)}
            />
            <label htmlFor={`weather-${option}`}>{option}</label>
          </div>))}
        </div>
      </fieldset>
      <fieldset>
        <legend>Visibility</legend>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {visibilityOptions.map((option) => (
          <div key={option}>
            <input
              type="radio"
              id={`visibility-${option}`}
              name="visibility"
              value={option}
              checked={visibility === option}
              onChange={(event) => setVisibility(event.currentTarget.value as Visibility)}/>
            <label htmlFor={`visibility-${option}`}>{option}</label>
          </div>))}
        </div>
      </fieldset>
      <div>
        <label>
          Comment:
          <input value={comment} onChange={(event) => setComment(event.target.value)} />
        </label>
      </div>
      {error && <p role="alert">{error}</p>}
      <button type="submit">Add</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default AddNewDiary;