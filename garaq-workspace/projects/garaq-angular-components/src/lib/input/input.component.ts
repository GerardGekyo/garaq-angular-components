import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';

@Component({
  selector: 'gc-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.gc-disabled]': 'disabled()',
    '[class.gc-invalid]': 'invalid()',
  },
})
export class InputComponent {
  private static _count = 0;

  inputLabel = input<string>();
  inputDescription = input<string>();
  placeholder = input<string>('');
  type = input<InputType>('text');
  value = input<string>('');
  maxLength = input<number | null>(null);
  disabled = input(false, { transform: booleanAttribute });
  invalid = input(false, { transform: booleanAttribute });

  valueChange = output<string>();

  protected readonly _id = `gc-input-${++InputComponent._count}`;

  // Tracks the live value to compute char count independently of parent binding
  protected readonly _currentValue = signal('');
  protected readonly charCount = computed(() => this._currentValue().length);
  protected readonly isAtLimit = computed(() => {
    const max = this.maxLength();
    return max !== null && this._currentValue().length >= max;
  });

  constructor() {
    // Sync whenever the value input changes from the parent
    effect(() => this._currentValue.set(this.value()));
  }

  protected onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this._currentValue.set(val);
    this.valueChange.emit(val);
  }
}
