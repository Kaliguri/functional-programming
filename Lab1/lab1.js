const filterEvenNumbers = (arr) => arr.filter(num => num % 2 === 0);

const squareNumbers = (arr) => arr.map(num => num ** 2);

const filterByProperty = (arr, prop) => arr.filter(obj => obj.hasOwnProperty(prop));

const sumArray = (arr) => arr.reduce((sum, num) => sum + num, 0);

const applyFunctionToArray = (fn, arr) => arr.map(fn);

const sumOfEvenSquares = (arr) => sumArray(squareNumbers(filterEvenNumbers(arr)));

const averageGreaterThan = (arr, prop, minValue) => {
    const filtered = arr.map(obj => obj[prop]).filter(value => value > minValue);
    return filtered.length ? sumArray(filtered) / filtered.length : 0;
};

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const objects = [
    { value: 3 },
    { value: 7 },
    { value: 10 },
    { value: 15 }
];

console.log("Начальный массив чисел:", numbers);
console.log("Четные числа:", filterEvenNumbers(numbers));
console.log("Квадраты чисел:", squareNumbers(numbers));
console.log("Объекты с нужным свойством:", filterByProperty(objects, 'value'));
console.log("Сумма всех чисел:", sumArray(numbers));
console.log("Сумма квадратов четных чисел:", sumOfEvenSquares(numbers));
console.log("Среднее значение чисел больше 5:", averageGreaterThan(objects, 'value', 5));