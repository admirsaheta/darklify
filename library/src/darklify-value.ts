import { useColorSchemeContext } from './context';

interface IDarklifyValue<T> {
  light: T;
  dark: T;
}

export class DarklifyValue<T> implements IDarklifyValue<T> {
  constructor(public readonly light: T, public readonly dark: T) {}
}

export function useDarklifyValue<T>(dynamic: IDarklifyValue<T>): T;
export function useDarklifyValue<T>(light: T, dark: T): T;
export function useDarklifyValue<T>(light: T | IDarklifyValue<T>, dark?: T): T {
  const mode = useColorSchemeContext();

  if (light instanceof DarklifyValue) {
    return mode === 'dark' ? light.dark : light.light;
  } else {
    return mode === 'dark' ? (dark as T) : (light as T);
  }
}
