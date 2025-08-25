import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './shared/components/header/header';

@Component({
  imports: [RouterModule, Header],
  selector: 'sendence-app',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'sendence-frontend';
}
