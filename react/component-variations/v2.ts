import {
  ComponentProps,
  ComponentType,
  FC,
  LazyExoticComponent,
  memo,
  NamedExoticComponent,
} from "react";

type ExtendedComponentType<T extends ComponentType> = FC<ComponentProps<T>> & {
  Async: LazyExoticComponent<T>;
  Memoized: NamedExoticComponent<T>;
  AsyncMemoized: NamedExoticComponent<LazyExoticComponent<T>>;
};
/**
 * Фабрика, необходимая для шаблонного генерирования вариантов компонентов
 *
 * @param component Исходный компнент, будет мемоизирован
 * @param asyncComponent Асинхронный компонент вида `lazy(() => import(".../somePath"))`
 *
 * @returns Изначальный, Асинхронный, только Мемоизированный и Асинхронный И Мемоизированный варианты переданного компонента
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
