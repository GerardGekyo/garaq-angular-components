import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
} from '@angular/core';

export type SwitchButtonSize = 'sm' | 'default' | 'lg';

@Component({
  selector: 'gc-switch-button',
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.gc-checked]': '_currentChecked()',
    '[class.gc-disabled]': 'disabled()',
    '[class.gc-size-sm]': 'size() === "sm"',
    '[class.gc-size-default]': 'size() === "default"',
    '[class.gc-size-lg]': 'size() === "lg"',
    '[style.--gc-switch-color]': 'color()',
  },
})
export class SwitchButtonComponent {
  private static _count = 0;

  label = input<string>();
  description = input<string>();
  checked = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });
  size = input<SwitchButtonSize>('default');
  /** Sets --gc-switch-color (accent: checked track background, focus ring) */
  color = input<string | null>(null);

  checkedChange = output<boolean>();

  protected readonly _id = `gc-switch-${++SwitchButtonComponent._count}`;
  protected readonly _currentChecked = signal(false);

  constructor() {
    effect(() => this._currentChecked.set(this.checked()));
  }

  protected onChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this._currentChecked.set(isChecked);
    this.checkedChange.emit(isChecked);
  }
}
