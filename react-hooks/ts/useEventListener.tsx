import { useEffect, useRef } from "react"
/**
 * Кастомный зук для изоморфной прослушки событий документа
 *
 * @param {string} eventType Эвент, который будет прослушиваться
 * @param {any} callback Функция, которая будет вызвана при срабатывании события
 * @param {Window} window Глобальный объект window, на который будет вещаться прослушка события
 * */
export default function useEventListener(
	eventType: string,
	callback: any,
	element: Window = window,
): void {
	const callbackReference = useRef(callback)

	useEffect((): void => {
		callbackReference.current = callback
	}, [callback])

	useEffect(() => {
		const handler = (event: any) => callbackReference.current(event)

		element.addEventListener(eventType, handler)

		return () => element.removeEventListener(eventType, handler)
	}, [eventType, element])
}
