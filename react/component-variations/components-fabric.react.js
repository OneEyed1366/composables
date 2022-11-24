import { memo } from "react";

/**
 * Фабрика, необходимая для шаблонного генерирования вариантов компонентов
 *
 * @template T
 * @template E
 *
 * @param {React.FC<React.ComponentPropsWithoutRef<T>>} component Исходный компнент, будет мемоизирован
 * @param {React.LazyExoticComponent<E>} asyncComponent Асинхронный компонент вида `lazy(() => import(".../somePath"))`
 *
 * @returns только Асинхронный, только Мемоизированный и Асинхронный И Мемоизированный варианты переданного компонента
 * */
export default function componentVariationsFabric(component, asyncComponent) {
  return {
    Async: asyncComponent,
    Memoized: memo(component),
    AsyncMemoized: memo(asyncComponent),
  };
}
