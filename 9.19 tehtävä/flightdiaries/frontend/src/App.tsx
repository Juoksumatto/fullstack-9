import { useEffect, useState } from 'react';
import Diary from '../components/diary';

type DiaryEntry = {
  id: number;
  date: string;
  weather: string;
  visibility: string;
};

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main>
      <h1>Flight diaries</h1>
      {diaries.map((diary) => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </main>
  );
}

export default App;