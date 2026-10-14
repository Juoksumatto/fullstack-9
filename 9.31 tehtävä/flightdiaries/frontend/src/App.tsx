import { useEffect, useState } from 'react';
import AddNewDiary from '../components/addnewdiary';
import Diary from '../components/diary';
import type { DiaryEntry, NewDiaryEntry } from './types';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [addingDiary, setAddingDiary] = useState(false);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await fetch('/api/diaries');

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data: DiaryEntry[] = await response.json();
        setDiaries(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch diaries');
      }
    };

    void fetchDiaries();
  }, []);

  const addDiary = async (diary: NewDiaryEntry) => {
    const response = await fetch('/api/diaries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(diary),
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const addedDiary: DiaryEntry = await response.json();
    setDiaries((currentDiaries) => [...currentDiaries, addedDiary]);
    setAddingDiary(false);
    setError(null);
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main>
      <h1>Flight diaries</h1>
      {addingDiary
        ? <AddNewDiary onCancel={() => setAddingDiary(false)} onSubmit={addDiary} />
        : <button type="button" onClick={() => setAddingDiary(true)}>Add new diary</button>}
      {diaries.map((diary) => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </main>
  );
}

export default App;