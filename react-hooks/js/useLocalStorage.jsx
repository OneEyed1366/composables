import { useCallback, useState } from 'react';
/**
 * @typedef IReturn
 * @returns {[() => string, (data: string) => void]}
 * */
/**
 * Хук для работа с LocalStorage
 *
 * @param {string} key Ключ, по которому будет записано значение
 * значения по переданному ключу,
 *
 * @returns {IReturn} Геттер и сеттер для работы с LocalStorage
 * */
export default function useLocalStorage(key) {
  const transformedKey = `${key}`;
  const errorBody = 'useLocalStorage -> error';

  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    try {
      const item = window.localStorage.getItem(transformedKey);

      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.error(`${errorBody} -> ${error}`);

      return undefined;
    }
  });

  const setter = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(value) : value;

        setValue(valueToStore);

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(transformedKey, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`${errorBody} -> ${error}`);
      }
    },
    [transformedKey],
  );

  return [value, setter];
}
