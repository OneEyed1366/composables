/**
 * Хук, при нажатии на который преденное ему значение будет скопировано в буфер обмена
 * @param {string} toClipboard Значение, которое будет скопировано
 * @param {Function} [callback] Опциональный callback, который будет выполнен после копирования в буфер обмена
 *
 * @returns {Function} Функция, которая скопирует переданные данные в буфер обмена и вызовет переданный callback (если передан)
 * */
export default function useCopyToClipboard(toClipboard, callback) {
  return () => {
    navigator.clipboard.writeText(toClipboard);

    if (callback) callback();
  };
}
