import "./Content.css";

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CoursePartWithDescription {
    kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
}

interface CoursePartBackground extends CoursePartWithDescription {
    backgroundMaterial: string;
    kind: "background";
}

interface CoursePartSpecial extends CoursePartWithDescription {
    requirements: string[];
    kind: "special";
}

export type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | CoursePartSpecial;

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.kind) {
        case "basic":
            return (
                <div>
                    <strong className="course-name">{part.name}</strong>
                    {part.exerciseCount}
                <p className="course-description">
                    {part.description}
                </p>
                </div>
            );
        case "group":
            return (
                <div>
                    <strong className="course-name">{part.name}</strong>
                    {part.exerciseCount}{" "}
                <p>
                    {part.groupProjectCount}
                </p>
                </div>
            );
        case "background":
            return (
                <div>
                    <strong className="course-name">{part.name}</strong>
                    {part.exerciseCount} 
                <p className="course-description">
                    {part.description}{" "}
                </p>
                <p>
                    {part.backgroundMaterial}
                </p>
                </div>
            );
        case "special":
            return (
                <div>
                    <strong className="course-name">{part.name}</strong>
                    {part.exerciseCount}
                <p className="course-description">
                    {part.description}
                </p>
                <p>
                    {part.requirements.join(", ")}
                    
                </p>
                </div>
            );
        default: {
            const exhaustiveCheck: never = part;
            return exhaustiveCheck;
        }
    }
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <div>
            {courseParts.map((part) => (
                <Part key={part.name} part={part} />
            ))}
        </div>
    );
};

export default Content;