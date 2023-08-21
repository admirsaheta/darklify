import { useColorSchemeContext } from "./context";

export function useDarklifyMode() {
    return useColorSchemeContext() === 'dark';
}