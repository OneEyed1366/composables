import { useHistory } from "react-router"
/**
 * Хук, помогающий прослушивать URL параметры
 *
 * @returns Массив, состоящий из:
 * 1) Get'ера, который динамически будет прослушивать переданное значение среди URL параметров
 * 2) Set'ера, который получает массив текущих параметров, приводит их к Объекту, объединяет их через rest-оператор,
 * а затем прописывает в url c помощью react-router'a
 * */
export default function useQuery<K>(): [
	K,
	(
		nextInit: Record<string, string>,
		navigateOptions?: { replace?: boolean | undefined; state?: any } | undefined,
	) => void,
] {
	const { location, push } = useHistory()
	const searchParameters = new URLSearchParams(location.search)
	const objectedSearchParameters = Object.fromEntries(searchParameters)

	const customGetter = new Proxy(objectedSearchParameters, {
		get(_, property: string) {
			return searchParameters.get(property)
		},
	}) as unknown as K

	const customSetSearchParameters = (nextInit: Record<string, string>) => {
		const newData = Object.entries({
			...Object.fromEntries(searchParameters),
			...nextInit,
		})
			.filter(([, value]) => value)
			.map(([key, value]) => `${key}=${value}`)
			.join("&")

		push({
			search: "?" + newData,
		})
	}

	return [customGetter, customSetSearchParameters]
}
