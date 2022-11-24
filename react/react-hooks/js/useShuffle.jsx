/**
 * Функция для перемешивания массива элементов с помощью алгоритма Фишера-Йетса
 * @param [unknown[]] items Массив неизвестных элементов, который надо перемешать
 *
 * @returns {unknown[]} Перемешанный массив элементов
 * */
export function shuffle(items) {
  let result = items;

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];

    result[i] = result[j];
    result[j] = temp;
  }

  return result;
}
/**
 * Самописный хук, который перемещивает массив переданных ему значений
 * @param {unknown[]} items Массив элементов, который необходимо перемешать
 *
 * @returns {unknown[]} Перемешанный массив элементов
 * */
export default function useShuffle(items) {
  return shuffle(items);
}
