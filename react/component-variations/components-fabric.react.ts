import {
  ComponentProps,
  ComponentType,
  FC,
  LazyExoticComponent,
  memo
} from "react";

/**
 * Фабрика, необходимая для шаблонного генерирования вариантов компонентов
 *
 * @param component Исходный компнент, будет мемоизирован
 * @param asyncComponent Асинхронный компонент вида `lazy(() => import(".../somePath"))`
 *
 * @returns только Асинхронный, только Мемоизированный и Асинхронный И Мемоизированный варианты переданного компонента
 * */
export default function componentVariationsFabric<
  T extends ComponentType<unknown>
>(component: FC<ComponentProps<T>>, asyncComponent: LazyExoticComponent<T>) {
  return {
    Async: asyncComponent,
    Memoized: memo(component),
    AsyncMemoized: memo(asyncComponent)
  };
}
