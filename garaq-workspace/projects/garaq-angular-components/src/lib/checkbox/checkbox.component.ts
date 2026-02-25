import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
} from '@angular/core';

export type CheckboxSize = 'sm' | 'default' | 'lg';

@Component({
  selector: 'gc-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.gc-checked]': '_currentChecked()',
    '[class.gc-disabled]': 'disabled()',
    '[class.gc-size-sm]': 'size() === "sm"',
    '[class.gc-size-default]': 'size() === "default"',
    '[class.gc-size-lg]': 'size() === "lg"',
    '[style.--gc-checkbox-color]': 'color()',
  },
})
export class CheckboxComponent {
  private static _count = 0;

  label = input<string>();
  description = input<string>();
  checked = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });
  size = input<CheckboxSize>('default');
  /** Sets --gc-checkbox-color (accent: checked border, checked bg, focus ring) */
  color = input<string | null>(null);

  checkedChange = output<boolean>();

  protected readonly _id = `gc-checkbox-${++CheckboxComponent._count}`;
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
