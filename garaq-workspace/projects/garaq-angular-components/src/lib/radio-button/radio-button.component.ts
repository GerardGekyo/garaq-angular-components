import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
} from '@angular/core';

export type RadioButtonSize = 'sm' | 'default' | 'lg';

@Component({
  selector: 'gc-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.gc-checked]': '_currentChecked()',
    '[class.gc-disabled]': 'disabled()',
    '[class.gc-size-sm]': 'size() === "sm"',
    '[class.gc-size-default]': 'size() === "default"',
    '[class.gc-size-lg]': 'size() === "lg"',
    '[style.--gc-radio-color]': 'color()',
  },
})
export class RadioButtonComponent {
  private static _count = 0;

  /** Group name — all radios with the same name are mutually exclusive */
  name = input.required<string>();
  /** The value this radio represents */
  value = input.required<any>();
  label = input<string>();
  description = input<string>();
  checked = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });
  size = input<RadioButtonSize>('default');
  /** Sets --gc-radio-color (accent: checked border, dot, focus ring) */
  color = input<string | null>(null);

  /** Emits this radio's value when selected */
  checkedChange = output<any>();

  protected readonly _id = `gc-radio-${++RadioButtonComponent._count}`;
  protected readonly _currentChecked = signal(false);

  constructor() {
    effect(() => this._currentChecked.set(this.checked()));
  }

  protected onChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this._currentChecked.set(true);
      this.checkedChange.emit(this.value());
    }
  }
}
