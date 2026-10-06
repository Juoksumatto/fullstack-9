type DiaryEntry = {
  id: number;
  date: string;
  weather: string;
  visibility: string;
};

type DiaryProps = {
  diary: DiaryEntry;
};

function Diary({ diary }: DiaryProps) {
  return (
    <section>
      <h2>{diary.date}</h2>
      <p>Weather: {diary.weather}</p>
      <p>Visibility: {diary.visibility}</p>
    </section>
  );
}

export default Diary;