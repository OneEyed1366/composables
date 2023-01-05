export type TTypedObject<T extends Record<string, unknown>> = {
  [Key in keyof T]: T[Key];
};
