import { Component } from '@angular/core';
import { ToggleTheme } from './toggle-theme/toggle-theme';

@Component({
  selector: 'sendence-header',
  imports: [ToggleTheme],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
