/ Функция, которая принимает два числа и возвращает их сумму
let add x y = x + y

// Функция, которая принимает два числа и возвращает их разность
let subtract x y = x - y

// Функция, которая принимает два числа и возвращает их произведение
let multiply x y = x * y

// Функция, которая принимает два числа и возвращает результат деления
let divide x y =
    if y = 0 then failwith "Division by zero" // обработка деления на ноль
    else x / y

// Рекурсивная функция для вычисления факториала числа
let rec factorial n =
    if n < 0 then failwith "Для факториала недопустимы значения ниже нуля"
    elif n = 0 then 1
    else n * factorial (n - 1)

// Примеры каррирования функций для создания специализированных функций
let addTen = add 10

let multiplyByFive = multiply 5

printfn "Сумма 3 и 4: %d" (add 3 4)
printfn "Разность 9 и 5: %d" (subtract 9 5)
printfn "Произведение 6 и 7: %d" (multiply 6 7)
printfn "Частное от деления 20 на 4: %d" (divide 20 4)
printfn "Факториал 5: %d" (factorial 5)

printfn "Прибавление 10 к 5: %d" (addTen 5)
printfn "Умножение 3 на 5: %d" (multiplyByFive 3)
