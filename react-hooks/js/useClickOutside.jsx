import { useEffect } from 'react';

/**
 * Сапомисный хук для выполнения переданного callback'a при клике ВНЕ контейнера, к которому прикреплен переданный `ref`
 *
 * @param {import('react').MutableRefObject<unknown>} ref Ссылка на наблюдаемый компонент
 * @param {function} callback Функция, которая будет вызвана при клике ВНЕ контейнера
 * */
export default function useClickOutside(ref, callback) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      callback(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
}
