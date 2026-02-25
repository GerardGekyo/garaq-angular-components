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

@Component({
  selector: 'gc-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.gc-disabled]': 'disabled()',
    '[class.gc-invalid]': 'invalid()',
  },
})
export class TextareaComponent {
  private static _count = 0;

  inputLabel = input<string>();
  inputDescription = input<string>();
  placeholder = input<string>('');
  rows = input<number>(3);
  value = input<string>('');
  maxLength = input<number | null>(null);
  disabled = input(false, { transform: booleanAttribute });
  invalid = input(false, { transform: booleanAttribute });

  valueChange = output<string>();

  protected readonly _id = `gc-textarea-${++TextareaComponent._count}`;
  protected readonly _currentValue = signal('');
  protected readonly charCount = computed(() => this._currentValue().length);
  protected readonly isAtLimit = computed(() => {
    const max = this.maxLength();
    return max !== null && this._currentValue().length >= max;
  });

  constructor() {
    effect(() => this._currentValue.set(this.value()));
  }

  protected onInput(event: Event): void {
    const val = (event.target as HTMLTextAreaElement).value;
    this._currentValue.set(val);
    this.valueChange.emit(val);
  }
}
