export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) ** 2);

    if (bmi < 18.5) {
        return 'Underweight';
    }

    if (bmi < 25) {
        return 'Normal range';
    }

    if (bmi < 30) {
        return 'Overweight';
    }

    return 'Obese';
};

if (process.argv[1] === import.meta.filename) {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);

  if (Number.isNaN(height) || Number.isNaN(weight)) {
    console.log('malformatted parameters');
  } else {
    console.log(calculateBmi(height, weight));
  }
}