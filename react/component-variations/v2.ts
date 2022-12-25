import {
  ComponentProps,
  ComponentType,
  FC,
  LazyExoticComponent,
  memo,
  MemoExoticComponent,
} from "react";

type ExtendedComponentType<T extends ComponentType> = FC<ComponentProps<T>> & {
  Async: LazyExoticComponent<T>;
  Memoized: MemoExoticComponent<T>;
  AsyncMemoized: MemoExoticComponent<LazyExoticComponent<T>>;
};
/**
 * Фабрика, необходимая для шаблонного генерирования вариантов компонентов
 *
 * @param component Исходный компнент, будет мемоизирован
 * @param asyncComponent Асинхронный компонент вида `lazy(() => import(".../somePath"))`
 *
 * @returns только Асинхронный, только Мемоизированный и Асинхронный И Мемоизированный варианты переданного компонента
 * */
export function componentVariationsFabric<T extends ComponentType>(
  component: FC<ComponentProps<T>>,
  asyncComponent: LazyExoticComponent<T>,
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
