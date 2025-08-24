import { DOCUMENT, inject, Injectable, signal } from '@angular/core';
import { STORAGE_KEY } from '../locals-storage/local-starage.constants';
import { LocalStorageService } from '../locals-storage/local-storage.service';
import { isTheme, Theme, THEME_TYPE } from './theme-service.types';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _document = inject(DOCUMENT);
  private readonly _localStorageService = inject(LocalStorageService);
  private readonly _currentTheme = signal<Theme>(THEME_TYPE.LIGHT);

  public init() {
    this._currentTheme.set(this._getSavedTheme());
    this.apply(this._currentTheme());
  }

  public theme(): Theme {
    return this._currentTheme();
  }

  private _getSavedTheme(): Theme {
    const savedTheme = this._localStorageService.getItem(STORAGE_KEY.THEME);
    return isTheme(savedTheme) ? savedTheme : THEME_TYPE.LIGHT;
  }

  public apply(theme: Theme) {
    this._localStorageService.setItem(STORAGE_KEY.THEME, theme);
    this._document.documentElement.classList.toggle(THEME_TYPE.DARK, theme === THEME_TYPE.DARK);
    this._currentTheme.set(this._getSavedTheme());
  }
}
