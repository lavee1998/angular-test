import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  click = output<MouseEvent>();
  selectable = input<boolean>(false);
  disabled = input<boolean>(false);
  small = input<boolean>(false);
  variant = input<'primary' | 'secondary'>('primary'); // InputSignal<string|undefined>

  handleClick(event: MouseEvent) {
    this.click.emit(event);
  }
}
