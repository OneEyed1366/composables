import { useEffect } from "react"

interface IProps {
  callback(): void
  delay: number
  watchableValues?: any[]
}

/**
 * Кастомный hook для выполнения логики спустя определенный период бездействия
 * со стороны пользователя
 *
 * @param {IProps} props
 * @param {number} props.delay Задержка, после которой будет вызван props.callback
 * @param {() => void} props.callback Функция, которая будет вызвана после переданного периода ожидания
 * @param {any[]} props.watchableValues Опциональный массив, который будет передан в
 * useEffect в виде дополнительных зависимостей
 * ```
 * useEffect(() => ..., [delay, ...watchableValues])
 * ```
 * */
export default function useDebounce({ callback, delay, watchableValues = [] }: IProps): void {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback()
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [delay, ...watchableValues])
}
