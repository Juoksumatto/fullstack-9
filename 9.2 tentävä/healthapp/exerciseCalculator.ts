interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (hours: number[], target: number): Result => {
    const periodLength = hours.length;
    const trainingDays = hours.filter((hour) => hour > 0).length;
    const average = hours.reduce((sum, hour) => sum + hour, 0) / periodLength;
    const success = average >= target;

    let rating = 1;
    let ratingDescription = 'poor';

    if (average >= target * 1.5) {
        rating = 3;
        ratingDescription = 'excellent';
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));