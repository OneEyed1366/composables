import { RefObject, useEffect, useState } from "react"
/**Параметры, необходимые для корректной настройки поведения после появления элемента*/
interface Args extends IntersectionObserverInit {
	freezeOnceVisible?: boolean
}
/**
 * Кастомный хук для определения видимости элемента в viewport'е пользователя
 *
 * @param elementRef Ref наблюдаемого элемента (того, при появлении которого должна выполняться какая-то логика)
 * */
export default function useIntersectionObserver(
	elementRef: RefObject<Element>,
	{ threshold = 0, root = null, rootMargin = "0%", freezeOnceVisible = false }: Args,
): IntersectionObserverEntry | undefined {
	const [entry, setEntry] = useState<IntersectionObserverEntry>()

	const frozen = entry?.isIntersecting && freezeOnceVisible

	const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
		setEntry(entry)
	}

	useEffect(() => {
		const node = elementRef?.current // DOM Ref
		const hasIOSupport = !!window.IntersectionObserver

		if (!hasIOSupport || frozen || !node) return

		const observerParams = { threshold, root, rootMargin }
		const observer = new IntersectionObserver(updateEntry, observerParams)

		observer.observe(node)

		return () => observer.disconnect()
	}, [elementRef, JSON.stringify(threshold), root, rootMargin, frozen])

	return entry
}
