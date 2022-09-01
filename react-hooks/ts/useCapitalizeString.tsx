/**
 * Трансформирует в переданной строке 1 Букву, Делая Её Заглавной
 *
 * @param {string} data Строка, которая будет трансформирована
 *
 * @return {string}
 * */
export default function useCapitalizeString(data: string): string {
	return [...data].reduce((acc, curr, i) => {
		if (i === 0) {
			return acc + curr.toUpperCase()
		}

		return acc + curr
	})
}
