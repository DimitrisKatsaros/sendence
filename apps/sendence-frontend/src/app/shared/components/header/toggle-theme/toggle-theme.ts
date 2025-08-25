import { Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { ThemeService } from '../../../services/theme-service/theme-service.service';
import { THEME_TYPE } from '../../../services/theme-service/theme-service.types';

@Component({
  selector: 'sendence-toggle-theme',
  imports: [],
  templateUrl: './toggle-theme.html',
  styleUrl: './toggle-theme.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ToggleTheme {
  private readonly _themeService = inject(ThemeService);
  public readonly isDarkMode = computed(() => {
    return this._themeService.theme() === THEME_TYPE.DARK;
  });

  public toggleTheme(): void {
    const theme = this._themeService.theme();
    if (theme === THEME_TYPE.DARK) this._themeService.apply(THEME_TYPE.LIGHT);
    else this._themeService.apply(THEME_TYPE.DARK);
  }
}
