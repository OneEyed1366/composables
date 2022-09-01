/**
 * @typedef ICookieOptions
 *
 * @property {string?} [domain]
 * @property {Date?} [expires]
 * @property {boolean?} httpOnly
 * @property {number?} [max-age]
 * @property {string?} [path]
 * @property {'low' | 'medium' | 'high' | undefined} [priority]
 * @property {true | false | 'lax' | 'strict' | 'none' | undefined} [sameSite]
 * @property {boolean?} [secure]
 * */

/**
 * Функция для чтения данных из Cookie
 *
 * @param {string} key Ключ, по которому будут записаны передаваемые данные
 *
 * @returns {string?}
 * */
export function getCookie(key) {
  let matches = document.cookie.match(
    // eslint-disable-next-line no-useless-escape
    new RegExp('(?:^|; )' + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
}
/**
 * Функция для записи данных в cookie
 *
 * @param {string} key Ключ, по которому будут записаны передаваемые данные
 * @param {string} value Значение, которое надо записать в Cookie
 * @param {ICookieOptions} [options] Дополнительные параметры, которые будут применены к Cookie
 *
 * @returns {void}
 * */
export function setCookie(key, value, options) {
  let updatedCookie = encodeURIComponent(key) + '=' + encodeURIComponent(value);

  if (options) {
    if (options.expires) options.expires = options.expires.toUTCString();

    for (let optionKey in options) {
      let optionValue = options[optionKey];

      updatedCookie += '; ' + optionKey;

      if (optionValue !== true) {
        updatedCookie += '=' + optionValue;
      }
    }
  }

  document.cookie = updatedCookie;
}
/**
 * Функция для удаления данных из Cookie
 *
 * @param {string} key Ключ, по которому будут записаны передаваемые данные
 *
 * @returns {void}*/
export function deleteCookie(key) {
  setCookie(key, '', {
    'max-age': -1,
  });
}
/**
 * Хук, который позволяет управлять Cookie's клиента
 *
 * @param {string} key Ключ, по которому будут записаны передаваемые данные
 * @param {ICookieOptions} [options] Дополнительные параметры, которые будут применены к Cookie
 *
 * @returns {[
 * Function: string?,
 * Function: void,
 * Function: void,
 * ]} Getter, Setter и Deletter данных, которые записаны по переданному `key` внутри cookie
 * */
export default function useCookie(key, options) {
  const getter = () => {
    return getCookie(key);
  };

  const setter = (value) => {
    return setCookie(key, value, options);
  };

  const deletter = () => {
    return deleteCookie(key);
  };

  return [getter, setter, deletter];
}
