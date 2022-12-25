import { ComponentType, FC, LazyExoticComponent, memo, MemoExoticComponent } from "react";

export type ExtendedComponentType<T> = FC<T> & {
  Async: LazyExoticComponent<ComponentType<T>>;
  Memoized: MemoExoticComponent<ComponentType<T>>;
  AsyncMemoized: MemoExoticComponent<LazyExoticComponent<ComponentType<T>>>;
};
/**
 * Фабрика, необходимая для шаблонного генерирования вариантов компонентов
 *
 * @param component Исходный компнент, будет мемоизирован
 * @param asyncComponent Асинхронный компонент вида `lazy(() => import(".../somePath"))`
 *
 * @returns только Асинхронный, только Мемоизированный и Асинхронный И Мемоизированный варианты переданного компонента
 * */
export function componentVariationsFabric<T>(
  component: FC<T>,
  asyncComponent: LazyExoticComponent<FC<T>>,
): ExtendedComponentType<T> {
  const _fields = {
    enumerable: true,
    writable: false,
  };

  return Object.defineProperties(component, {
    Async: {
      ..._fields,
      value: asyncComponent,
    },
    Memoized: {
      ..._fields,
      value: memo(component),
    },
    AsyncMemoized: {
      ..._fields,
      value: memo(asyncComponent),
    },
  }) as ExtendedComponentType<T>;
}
