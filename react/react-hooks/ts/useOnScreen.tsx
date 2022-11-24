import { RefObject, useEffect, useState } from "react"

/**
 * https://usehooks.com/useOnScreen/
 * Этот хук позволяет вам легко определить, когда элемент виден на экране,
 * а также указать, какая часть элемента должна быть видна,
 * прежде чем будет рассматриваться на экране.
 *
 * Идеально подходит для отложенной загрузки изображений или запуска анимации,
 * когда пользователь прокрутил страницу до определенного раздела.
 *
 * @param ref
 * @param rootMargin
 */

export default function useOnScreen(
	ref: RefObject<HTMLDivElement>,
	options?: IntersectionObserverInit,
) {
	const [isIntersecting, setIntersecting] = useState(false)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => setIntersecting(entry.isIntersecting),
			options,
		)
		if (ref.current) {
			observer.observe(ref.current)
		}
		// @ts-ignore
		return () => observer.disconnect()
	}, [])

	return isIntersecting
}
