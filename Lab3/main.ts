// Функция, возвращающая все элементы массива, делящиеся на заданное число без остатка
function getDivisibleNumbers(numbers: number[], factor: number): number[] {
    return numbers.filter((value) => value % factor === 0);
  }
  
  // Пример использования:
  console.log(getDivisibleNumbers([10, 13, 15, 18, 21], 3)); // [15, 18, 21]
  
  // Функция, которая объединяет строки массива с указанным разделителем
  function concatenateWords(words: string[], glue: string): string {
    return words.join(glue);
  }
  
  // Пример использования:
  console.log(concatenateWords(['Кот', 'собака', 'лиса'], ' | ')); // "Кот | собака | лиса"
  
  // Функция сортировки массива объектов по заданному полю
  function orderByField<T, K extends keyof T>(list: T[], key: K): T[] {
    return [...list].sort((first, second) => {
      if (first[key] < second[key]) return -1;
      if (first[key] > second[key]) return 1;
      return 0;
    });
  }
  
  // Пример использования:
  type Animal = { species: string; weight: number };
  
  const zoo: Animal[] = [
    { species: 'Слон', weight: 5000 },
    { species: 'Тигр', weight: 220 },
    { species: 'Панда', weight: 100 }
  ];
  
  console.log(orderByField(zoo, 'weight'));
  
  // Функция-декоратор, которая добавляет логирование к любой другой функции
  function addLogger<F extends (...args: any[]) => any>(callback: F): F {
    return function (...args: Parameters<F>): ReturnType<F> {
      console.log('Аргументы вызова:', args);
      const output = callback(...args);
      console.log('Результат выполнения:', output);
      return output;
    } as F;
  }
  
  // Пример использования:
  const multiply = (x: number, y: number): number => x * y;
  const verboseMultiply = addLogger(multiply);
  console.log(verboseMultiply(6, 7)); // Logs: Аргументы вызова: [6, 7] — Результат выполнения: 42
  