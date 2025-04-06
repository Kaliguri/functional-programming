var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Функция, возвращающая все элементы массива, делящиеся на заданное число без остатка
function getDivisibleNumbers(numbers, factor) {
    return numbers.filter(function (value) { return value % factor === 0; });
}
// Пример использования:
console.log(getDivisibleNumbers([10, 13, 15, 18, 21], 3)); // [15, 18, 21]
// Функция, которая объединяет строки массива с указанным разделителем
function concatenateWords(words, glue) {
    return words.join(glue);
}
// Пример использования:
console.log(concatenateWords(['Кот', 'собака', 'лиса'], ' | ')); // "Кот | собака | лиса"
// Функция сортировки массива объектов по заданному полю
function orderByField(list, key) {
    return __spreadArray([], list, true).sort(function (first, second) {
        if (first[key] < second[key])
            return -1;
        if (first[key] > second[key])
            return 1;
        return 0;
    });
}
var zoo = [
    { species: 'Слон', weight: 5000 },
    { species: 'Тигр', weight: 220 },
    { species: 'Панда', weight: 100 }
];
console.log(orderByField(zoo, 'weight'));
// Функция-декоратор, которая добавляет логирование к любой другой функции
function addLogger(callback) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log('Аргументы вызова:', args);
        var output = callback.apply(void 0, args);
        console.log('Результат выполнения:', output);
        return output;
    };
}
// Пример использования:
var multiply = function (x, y) { return x * y; };
var verboseMultiply = addLogger(multiply);
console.log(verboseMultiply(6, 7)); // Logs: Аргументы вызова: [6, 7] — Результат выполнения: 42
