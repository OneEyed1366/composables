import { FC, ComponentType, ComponentProps, memo } from "react";

/**
 * Фабрика, необходимая для шаблонного генерирования вариантов компонентов
 *
 * @template {ComponentType<unknown>} T
 * @param {FC<ComponentProps<T>>} component Исходный компнент, будет мемоизирован
 * @param {LazyExoticComponent<T>} asyncComponent Асинхронный компонент вида `lazy(() => import(".../somePath"))`
 *
 * @returns только Асинхронный, только Мемоизированный и Асинхронный И Мемоизированный варианты переданного компонента
 * */
export default function componentVariationsFabric(component, asyncComponent) {
  return {
    Async: asyncComponent,
    Memoized: memo(component),
    AsyncMemoized: memo(asyncComponent)
  };
}
