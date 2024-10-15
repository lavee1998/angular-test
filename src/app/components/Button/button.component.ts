import { Component, Input, input, output } from '@angular/core';
import clsx from 'clsx';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})

// export type ButtonVariant = 'primary' | 'secondary';
export class ButtonComponent {
  click = output<MouseEvent>();
  selectable = input<boolean>(false);
  disabled = input<boolean>(false);
  small = input<boolean>(false);
  classNames = input<string>('');
  clsx = clsx;
  variant = input<'primary' | 'secondary'>('primary'); // InputSignal<string|undefined>

  handleClick(event: MouseEvent) {
    this.click.emit(event);
  }
}
