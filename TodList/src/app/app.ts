import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todo } from "./Components/todo/todo";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TodList');


}
