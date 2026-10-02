export type CoursePart = {
    name: string;
    exerciseCount: number;
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <div>
            {courseParts.map((part) => (
                <p key={part.name}>{part.name} {part.exerciseCount}</p>
            ))}
        </div>
    );
};

export default Content;