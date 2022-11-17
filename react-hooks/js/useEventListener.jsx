import { useRef, useEffect } from "react";
/**
 * @function
 * @template {keyof HTMLElementEventMap | keyof WindowEventMap | keyof MediaQueryListEventMap} T
 * @template {HTMLElement | MediaQueryList | Window & typeof globalThis} K
 *
 * @param {T} eventName
 * @param {() => void} handler
 * @param {K} [element]
 *
 * @returns {void}
 * */
export function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!(element && element.addEventListener)) return;

    const eventListener = (event) => savedHandler.current(event);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
