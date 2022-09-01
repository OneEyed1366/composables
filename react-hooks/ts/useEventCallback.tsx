import { useLayoutEffect, useMemo, useRef } from "react"

type IFunction<ARGS extends any[], R> = (...args: ARGS) => R
/**
 * Кастмный хук для устранения проблемы слишком частоых перерисовок с useCallback
 *
 * @param {IFunction} func Функция, которая будет
 * */
export default function useEventCallback<A extends any[], R>(
	func: IFunction<A, R>,
): IFunction<A, R> {
	let ref = useRef<IFunction<A, R>>(func)

	useLayoutEffect(() => {
		ref.current = func
	})

	return useMemo(
		() =>
			(...args: A): R => {
				const { current } = ref
				return current(...args)
			},
		[],
	)
}
