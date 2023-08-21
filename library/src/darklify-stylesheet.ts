import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { IndexedObject, ValueOf } from 'toolkit.ts';
import { DarklifyValue, useDarklifyValue } from './darklify-value';
import { Mode } from './types';

declare const process: {
  env: {
    NODE_ENV: string;
  };
};

type Style = ViewStyle | TextStyle | ImageStyle;

type DarklifyStyle<T extends Style> = { [Key in keyof T]: T[Key] | DarklifyValue<T[Key]> };
type DarklifyStyles<T> = { [P in keyof T]: DarklifyStyle<Style> };

type NormalizeStyle<T> = T extends DarklifyStyle<infer R> ? R : T;
export type NormalizeStyles<T extends DarklifyStyles<T>> = { [Key in keyof T]: NormalizeStyle<T[Key]> };

export type DarklifyViewStyle = DarklifyStyle<ViewStyle>;
export type DarklifyTextStyle = DarklifyStyle<TextStyle>;
export type DarklifyImageStyle = DarklifyStyle<ImageStyle>;

function parseStylesFor<T extends DarklifyStyles<T>>(styles: T, mode: Mode): NormalizeStyles<T> {
  const newStyles: IndexedObject<IndexedObject<ValueOf<ValueOf<T>>>> = {};

  let containsDarklifyValues = false;

  for (const i in styles) {
    const style = styles[i];
    type Value = ValueOf<ValueOf<T>>;
    const newStyle: IndexedObject<Value> = {};
    for (const key in style) {
      if (style.hasOwnProperty(key)) {
        const value = style[key];
  
        if (value instanceof DarklifyValue) {
          containsDarklifyValues = true;
          // @ts-ignore
          newStyle[key] = value[mode];
        } else {
          newStyle[key] = value as Value;
        }
      }
    }
    newStyles[i] = newStyle;
  }

  if (!containsDarklifyValues && process.env.NODE_ENV !== 'production') {
    console.warn(
      'A DarklifyStyleSheet was used without any DarklifyValues. Consider replacing with a regular StyleSheet.'
    );
  }

  return newStyles as NormalizeStyles<T>;
}

export class DarklifyStyleSheet<T extends DarklifyStyles<T>> {
  public readonly dark: NormalizeStyles<T>;
  public readonly light: NormalizeStyles<T>;

  constructor(styles: T) {
    this.dark = StyleSheet.create(parseStylesFor(styles, 'dark')) as NormalizeStyles<T>;
    this.light = StyleSheet.create(parseStylesFor(styles, 'light')) as NormalizeStyles<T>;
  }
}

export const useDarklifyStyleSheet = useDarklifyValue;
