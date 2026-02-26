import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  output,
  signal,
} from '@angular/core';

export interface GcSelectOption {
  label: string;
  value: any;
  description?: string;
  disabled?: boolean;
}

@Component({
  selector: 'gc-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.gc-disabled]': 'disabled()',
    '[class.gc-invalid]': 'invalid()',
    '[class.gc-open]': '_isOpen()',
    '[attr.aria-disabled]': 'disabled() || null',
    '[style.--gc-select-focus]': 'color()',
    '(document:click)': '_onDocumentClick($event)',
  },
})
export class SelectComponent {
  private static _count = 0;

  options = input<(string | GcSelectOption)[]>([]);
  value = input<any>(null);
  placeholder = input<string>('Select...');
  inputLabel = input<string>('');
  inputDescription = input<string>('');
  disabled = input(false, { transform: booleanAttribute });
  invalid = input(false, { transform: booleanAttribute });
  emptyText = input<string>('No options available');
  /** Sets the accent/focus color */
  color = input<string | null>(null);

  valueChange = output<any>();

  protected readonly _id = `gc-select-${++SelectComponent._count}`;
  protected readonly _listboxId = `${this._id}-listbox`;
  protected readonly _triggerId = `${this._id}-trigger`;

  protected readonly _isOpen = signal(false);
  protected readonly _highlightedIndex = signal(-1);
  protected readonly _selectedValue = signal<any>(null);

  constructor(private _elRef: ElementRef) {
    effect(() => this._selectedValue.set(this.value()));
  }

  protected readonly _normalizedOptions = computed<GcSelectOption[]>(() =>
    this.options().map((o) =>
      typeof o === 'string' ? { label: o, value: o } : o
    )
  );

  protected readonly _selectedOption = computed<GcSelectOption | null>(() => {
    const val = this._selectedValue();
    if (val == null) return null;
    return this._normalizedOptions().find((o) => o.value === val) ?? null;
  });

  protected readonly _displayLabel = computed(() =>
    this._selectedOption()?.label ?? ''
  );

  protected readonly _activeDescendantId = computed(() => {
    const idx = this._highlightedIndex();
    return idx >= 0 ? `${this._id}-option-${idx}` : null;
  });

  protected _open(): void {
    if (this.disabled()) return;
    if (!this._isOpen()) {
      this._isOpen.set(true);
      // Highlight currently selected option
      const opts = this._normalizedOptions();
      const val = this._selectedValue();
      const idx = val != null ? opts.findIndex((o) => o.value === val) : -1;
      this._highlightedIndex.set(idx);
    }
  }

  protected _close(): void {
    if (this._isOpen()) {
      this._isOpen.set(false);
      this._highlightedIndex.set(-1);
    }
  }

  protected _toggle(): void {
    if (this.disabled()) return;
    if (this._isOpen()) {
      this._close();
    } else {
      this._open();
    }
  }

  protected _onKeydown(event: KeyboardEvent): void {
    const opts = this._normalizedOptions();

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        if (!this._isOpen()) {
          this._open();
          return;
        }
        let next = this._highlightedIndex() + 1;
        while (next < opts.length && opts[next].disabled) next++;
        if (next >= opts.length) {
          next = 0;
          while (next < opts.length && opts[next].disabled) next++;
        }
        if (next < opts.length) this._highlightedIndex.set(next);
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        if (!this._isOpen()) {
          this._open();
          return;
        }
        let prev = this._highlightedIndex() - 1;
        while (prev >= 0 && opts[prev].disabled) prev--;
        if (prev < 0) {
          prev = opts.length - 1;
          while (prev >= 0 && opts[prev].disabled) prev--;
        }
        if (prev >= 0) this._highlightedIndex.set(prev);
        break;
      }
      case 'Enter':
      case ' ': {
        event.preventDefault();
        if (!this._isOpen()) {
          this._open();
          return;
        }
        const idx = this._highlightedIndex();
        if (idx >= 0 && idx < opts.length && !opts[idx].disabled) {
          this._selectOption(opts[idx]);
        }
        break;
      }
      case 'Escape':
        event.preventDefault();
        this._close();
        break;
      case 'Tab':
        this._close();
        break;
      case 'Home': {
        event.preventDefault();
        if (this._isOpen()) {
          let first = 0;
          while (first < opts.length && opts[first].disabled) first++;
          if (first < opts.length) this._highlightedIndex.set(first);
        }
        break;
      }
      case 'End': {
        event.preventDefault();
        if (this._isOpen()) {
          let last = opts.length - 1;
          while (last >= 0 && opts[last].disabled) last--;
          if (last >= 0) this._highlightedIndex.set(last);
        }
        break;
      }
    }
  }

  protected _selectOption(option: GcSelectOption): void {
    if (option.disabled) return;
    this._selectedValue.set(option.value);
    this.valueChange.emit(option.value);
    this._close();
  }

  protected _onDocumentClick(event: Event): void {
    if (!this._elRef.nativeElement.contains(event.target as Node)) {
      this._close();
    }
  }

  protected _onOptionMouseenter(index: number): void {
    this._highlightedIndex.set(index);
  }
}
