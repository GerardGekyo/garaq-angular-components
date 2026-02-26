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
  viewChild,
} from '@angular/core';

export type ComboboxMode = 'single' | 'multiple';

export interface GcComboboxOption {
  label: string;
  value: any;
  description?: string;
  disabled?: boolean;
}

@Component({
  selector: 'gc-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.gc-mode-single]': 'mode() === "single"',
    '[class.gc-mode-multiple]': 'mode() === "multiple"',
    '[class.gc-disabled]': 'disabled()',
    '[class.gc-invalid]': 'invalid()',
    '[class.gc-open]': '_isOpen()',
    '[attr.aria-disabled]': 'disabled() || null',
    '[style.--gc-combobox-focus]': 'color()',
    '(document:click)': '_onDocumentClick($event)',
  },
})
export class ComboboxComponent {
  private static _count = 0;

  mode = input<ComboboxMode>('single');
  options = input<(string | GcComboboxOption)[]>([]);
  value = input<any>(null);
  values = input<any[]>([]);
  placeholder = input<string>('Search...');
  inputLabel = input<string>('');
  inputDescription = input<string>('');
  disabled = input(false, { transform: booleanAttribute });
  invalid = input(false, { transform: booleanAttribute });
  emptyText = input<string>('No results found');
  /** Sets the accent/focus color */
  color = input<string | null>(null);

  valueChange = output<any>();
  valuesChange = output<any[]>();
  searchChange = output<string>();

  protected readonly _id = `gc-combobox-${++ComboboxComponent._count}`;
  protected readonly _listboxId = `${this._id}-listbox`;

  protected readonly _isOpen = signal(false);
  protected readonly _searchText = signal('');
  protected readonly _highlightedIndex = signal(-1);
  protected readonly _selectedValue = signal<any>(null);
  protected readonly _selectedValues = signal<any[]>([]);

  protected readonly _inputEl = viewChild<ElementRef<HTMLInputElement>>('inputEl');

  constructor(private _elRef: ElementRef) {
    effect(() => this._selectedValue.set(this.value()));
    effect(() => this._selectedValues.set([...this.values()]));
  }

  /** Normalize raw options to GcComboboxOption[] */
  protected readonly _normalizedOptions = computed<GcComboboxOption[]>(() =>
    this.options().map((o) =>
      typeof o === 'string' ? { label: o, value: o } : o
    )
  );

  /** Options filtered by search text */
  protected readonly _filteredOptions = computed<GcComboboxOption[]>(() => {
    const search = this._searchText().toLowerCase().trim();
    if (!search) return this._normalizedOptions();
    return this._normalizedOptions().filter(
      (o) =>
        o.label.toLowerCase().includes(search) ||
        (o.description && o.description.toLowerCase().includes(search))
    );
  });

  /** Active descendant ID for aria */
  protected readonly _activeDescendantId = computed(() => {
    const idx = this._highlightedIndex();
    return idx >= 0 ? `${this._id}-option-${idx}` : null;
  });

  /** Display text for single-mode input */
  protected readonly _displayText = computed(() => {
    if (this.mode() !== 'single') return this._searchText();
    const val = this._selectedValue();
    if (val == null) return this._searchText();
    const opt = this._normalizedOptions().find((o) => o.value === val);
    return this._isOpen() ? this._searchText() : (opt?.label ?? '');
  });

  /** Selected options for multi-mode tags */
  protected readonly _selectedOptions = computed<GcComboboxOption[]>(() => {
    const vals = this._selectedValues();
    return this._normalizedOptions().filter((o) => vals.includes(o.value));
  });

  protected _isSelected(option: GcComboboxOption): boolean {
    if (this.mode() === 'single') {
      return this._selectedValue() === option.value;
    }
    return this._selectedValues().includes(option.value);
  }

  protected _open(): void {
    if (this.disabled()) return;
    if (!this._isOpen()) {
      this._isOpen.set(true);
      this._highlightedIndex.set(-1);
      if (this.mode() === 'single') {
        this._searchText.set('');
      }
    }
  }

  protected _close(): void {
    if (this._isOpen()) {
      this._isOpen.set(false);
      this._searchText.set('');
      this._highlightedIndex.set(-1);
    }
  }

  protected _toggle(): void {
    if (this.disabled()) return;
    if (this._isOpen()) {
      this._close();
    } else {
      this._open();
      this._inputEl()?.nativeElement.focus();
    }
  }

  protected _onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this._searchText.set(val);
    this._highlightedIndex.set(-1);
    this.searchChange.emit(val);
    if (!this._isOpen()) {
      this._open();
    }
  }

  protected _onFocus(): void {
    this._open();
  }

  protected _onKeydown(event: KeyboardEvent): void {
    const filtered = this._filteredOptions();

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        this._open();
        let next = this._highlightedIndex() + 1;
        // Skip disabled options
        while (next < filtered.length && filtered[next].disabled) next++;
        if (next >= filtered.length) {
          // Loop to beginning
          next = 0;
          while (next < filtered.length && filtered[next].disabled) next++;
        }
        if (next < filtered.length) this._highlightedIndex.set(next);
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        this._open();
        let prev = this._highlightedIndex() - 1;
        while (prev >= 0 && filtered[prev].disabled) prev--;
        if (prev < 0) {
          prev = filtered.length - 1;
          while (prev >= 0 && filtered[prev].disabled) prev--;
        }
        if (prev >= 0) this._highlightedIndex.set(prev);
        break;
      }
      case 'Enter': {
        event.preventDefault();
        const idx = this._highlightedIndex();
        if (this._isOpen() && idx >= 0 && idx < filtered.length) {
          const opt = filtered[idx];
          if (!opt.disabled) {
            this._selectOption(opt);
          }
        }
        break;
      }
      case 'Escape':
        event.preventDefault();
        this._close();
        break;
      case 'Backspace':
        if (
          this.mode() === 'multiple' &&
          this._searchText() === '' &&
          this._selectedValues().length > 0
        ) {
          this._removeLastTag();
        }
        break;
      case 'Tab':
        this._close();
        break;
    }
  }

  protected _selectOption(option: GcComboboxOption): void {
    if (option.disabled) return;

    if (this.mode() === 'single') {
      this._selectedValue.set(option.value);
      this._searchText.set('');
      this.valueChange.emit(option.value);
      this._close();
    } else {
      const current = [...this._selectedValues()];
      const idx = current.indexOf(option.value);
      if (idx >= 0) {
        current.splice(idx, 1);
      } else {
        current.push(option.value);
      }
      this._selectedValues.set(current);
      this._searchText.set('');
      this.valuesChange.emit(current);
      // Keep open in multi mode, refocus input
      this._inputEl()?.nativeElement.focus();
    }
  }

  protected _removeTag(value: any): void {
    const current = this._selectedValues().filter((v) => v !== value);
    this._selectedValues.set(current);
    this.valuesChange.emit(current);
    this._inputEl()?.nativeElement.focus();
  }

  protected _removeLastTag(): void {
    const current = [...this._selectedValues()];
    if (current.length > 0) {
      current.pop();
      this._selectedValues.set(current);
      this.valuesChange.emit(current);
    }
  }

  protected _clearSingle(event: MouseEvent): void {
    event.stopPropagation();
    this._selectedValue.set(null);
    this._searchText.set('');
    this.valueChange.emit(null);
    this._inputEl()?.nativeElement.focus();
  }

  protected _onDocumentClick(event: Event): void {
    if (!this._elRef.nativeElement.contains(event.target as Node)) {
      this._close();
    }
  }

  protected _onOptionMouseenter(index: number): void {
    this._highlightedIndex.set(index);
  }

  protected _trackByValue(_index: number, option: GcComboboxOption): any {
    return option.value;
  }
}
