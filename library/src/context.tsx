import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { Mode } from './types';


export const ColorSchemeContext = createContext<Mode | undefined>(undefined);
ColorSchemeContext.displayName = 'ColorSchemeContext';

abstract class ColorSchemeProviderBase {
  protected abstract getContextValue(): Mode;

  public abstract useColorSchemeContext(): Mode;

  public provide(children: ReactNode) {
    const contextValue = this.getContextValue();
    return (
      <ColorSchemeContext.Provider value={contextValue}>
        {children}
      </ColorSchemeContext.Provider>
    );
  }
}

class ColorSchemeProvider extends ColorSchemeProviderBase {
  constructor(private mode?: Mode) {
    super();
  }

  protected getContextValue(): Mode {
    return this.mode || (useColorScheme() as Mode) || 'light';
  }

  public useColorSchemeContext(): Mode {
    const context = useContext(ColorSchemeContext);
    return context || (useColorScheme() as Mode) || 'light';
  }
}

export const DarkModeContext = ColorSchemeContext;
export const DarkModeProvider = ColorSchemeProvider;

export function useColorSchemeContext(): Mode {
  return DarkModeProvider.prototype.useColorSchemeContext.call(null);
}

export const useDarkModeContext = useColorSchemeContext;
