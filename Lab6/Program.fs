open System

// Арифметические функции
let add x y = x + y
let subtract x y = x - y
let multiply x y = x * y
let divide x y =
    if y = 0.0 then
        nan
    else
        x / y

let power x y = Math.Pow(x, y)
let squareRoot x =
    if x < 0.0 then
        nan
    else
        Math.Sqrt(x)

let sin x = Math.Sin(x)
let cos x = Math.Cos(x)
let tan x = Math.Tan(x)

// Проверка и ввод чисел
let rec parseInput prompt =
    printf "%s" prompt
    let input = Console.ReadLine()
    match Double.TryParse(input) with
    | (true, result) -> result
    | _ ->
        printfn "Ввод некорректный. Введите число."
        parseInput prompt

// Обработка операций
let applyOperation operation x y =
    match operation with
    | "add" -> add x y
    | "subtract" -> subtract x y
    | "multiply" -> multiply x y
    | "divide" -> divide x y
    | "power" -> power x y
    | _ -> failwith "Неизвестная операция"

// Основная функция калькулятора
let rec calculator () =
    printfn "Калькулятор:"
    printfn "1. Сложение (+)"
    printfn "2. Вычитание (-)"
    printfn "3. Умножение (*)"
    printfn "4. Деление (/)"
    printfn "5. Возведение в степень (^)"
    printfn "6. Квадратный корень (sqrt)"
    printfn "7. Синус (sin)"
    printfn "8. Косинус (cos)"
    printfn "9. Тангенс (tan)"
    printfn "0. Выход"
    
    let valid_choices = ["0"; "1"; "2"; "3"; "4"; "5"; "6"; "7"; "8"; "9"]
    printf "Выберите операцию (0-9): "
    let choice = Console.ReadLine()
    
    if not (List.contains choice valid_choices) then
        printfn "Неверная операция"
        printfn "///////////////////////"
        calculator ()
    else
        match choice with
        | "0" ->
            printfn "[Производится выход из калькулятора]"
            Environment.Exit(0)
        | "6" ->
            let x = parseInput "Введите число для вычисления квадратного корня: "
            let result = squareRoot x
            printfn "Результат: %f" result
        | "7" ->
            let x = parseInput "Введите угол в радианах для вычисления синуса: "
            let result = sin x
            printfn "Результат: %f" result
        | "8" ->
            let x = parseInput "Введите угол в радианах для вычисления косинуса: "
            let result = cos x
            printfn "Результат: %f" result
        | "9" ->
            let x = parseInput "Введите угол в радианах для вычисления тангенса: "
            let result = tan x
            printfn "Результат: %f" result
        | _ ->
            let x = parseInput "Введите первое число: "
            let y = parseInput "Введите второе число: "
            let operation =
                match choice with
                | "1" -> "add"
                | "2" -> "subtract"
                | "3" -> "multiply"
                | "4" -> "divide"
                | "5" -> "power"
                | _ -> failwith "Что-то пошло не так"
            let result = applyOperation operation x y
            printfn "Результат: %f" result

        printfn "///////////////////////"
        calculator ()

// Точка входа
[<EntryPoint>]
let main argv =
    calculator ()
    0
