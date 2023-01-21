// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  { "kind": "Мангустин", "color": "фиолетовый", "weight": 13 },
  { "kind": "Дуриан", "color": "зеленый", "weight": 35 },
  { "kind": "Личи", "color": "розово-красный", "weight": 17 },
  { "kind": "Карамбола", "color": "желтый", "weight": 28 },
  { "kind": "Тамаринд", "color": "светло-коричневый", "weight": 22 }
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/
let colorClass = {
  'красный': 'fruit_carmazin',
  'розово-красный': 'fruit_carmazin',
  'оранжевый': 'fruit_lightbrown',
  'светло-коричневый': 'fruit_lightbrown',
  'желтый': 'fruit_yellow',
  'зеленый': 'fruit_green',
  'голубой': 'fruit_sky',
  'синий': 'fruit_blue',
  'фиолетовый': 'fruit_violet',
};
// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = '';
  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    let li = document.createElement('li');
    li.className = `fruit__item ${Object.hasOwn(colorClass, fruits[i].color) ? colorClass[fruits[i].color]: 'not-color'}`;
    li.innerHTML = `
      <div class="fruit__info">
        <div>index: ${i}</div>
        <div>kind: ${fruits[i].kind}</div>
        <div>color: ${fruits[i].color}</div>
        <div>weight (кг): ${fruits[i].weight}</div>
      </div>`;
    fruitsList.appendChild(li);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let firstFruits = JSON.parse(JSON.stringify(fruits));;
  let countFlag = 0;
  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    let random = getRandomInt(0, fruits.length - 1);
    result.push(fruits[random]);
    fruits.splice(random, 1);
  }
  for (let i = 0; i < firstFruits.length; i++) {
    if (firstFruits[i].kind == result[i].kind && firstFruits[i].color == result[i].color && firstFruits[i].weight == result[i].weight) {
      countFlag++;
    }
  }
  if (countFlag === firstFruits.length) alert('Порядок не изменился');
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let max = document.querySelector('.maxweight__input').value;
  let min = document.querySelector('.minweight__input').value;
  fruits = fruits.filter((item) => {
    return item.weight >= min && item.weight <= max;
  });
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки
const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  let color = ['красный', 'оранжевый', 'желтый', 'зеленый', 'голубой', 'синий', 'фиолетовый'];
  let indexA = color.indexOf(a.color);
  let indexB = color.indexOf(b.color);
  if (indexA == -1) indexA = color.length + 1;
  if (indexB == -1) indexB = color.length + 1;
  if (indexA < indexB) return true;
  if (indexA > indexB) return false;
  return false;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        if (!comparation(arr[j], arr[j + 1])) {
          let temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    function partition(arr, start, end, comparation) {
      const pivotValue = arr[end];
      let pivotIndex = start;
      for (let i = start; i < end; i++) {
        if (comparation(arr[i], pivotValue)) {
          [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
          pivotIndex++;
        }
      }
      [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]
      return pivotIndex;
    };

    function sortRecursive(arr, start, end, comparation) {
      if (start >= end) {
        return;
      }
      let index = partition(arr, start, end, comparation);
      sortRecursive(arr, start, index - 1, comparation);
      sortRecursive(arr, index + 1, end, comparation);
    }
    arr = sortRecursive(arr, 0, arr.length - 1, comparation);
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
    sortTimeLabel.textContent = sortTime;
  },
};

// инициализация полей  
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if (sortKind == 'bubbleSort') sortKind = 'quickSort';
  else sortKind = 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if (kindInput.value == '' || colorInput.value == '' || weightInput.value == '') {
    alert('Пустое поле!');
  }
  else {
    fruits.push({ "kind": kindInput.value, "color": colorInput.value, "weight": weightInput.value });
    display();
  }
});
