export const THEME_TYPE = {
  LIGHT: 'light',
  DARK: 'dark',
};

export type Theme = (typeof THEME_TYPE)[keyof typeof THEME_TYPE];

export function isTheme(value: string | null): value is Theme {
  return value === THEME_TYPE.LIGHT || value === THEME_TYPE.DARK;
}
