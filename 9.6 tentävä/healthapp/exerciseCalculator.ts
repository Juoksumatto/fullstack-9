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

const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Please provide the target and daily exercise values');
  process.exit(1);
}

const target = Number(args[0]);
const hours = args.slice(1).map((value) => Number(value));

if (Number.isNaN(target) || hours.some((hour) => Number.isNaN(hour))) {
  console.log('malformatted parameters');
  process.exit(1);
}

console.log(calculateExercises(hours, target));