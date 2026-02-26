import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
} from '@angular/core';

export interface GcTab {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: 'gc-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--gc-tabs-color]': 'color()',
  },
})
export class TabsComponent {
  tabs = input.required<(string | GcTab)[]>();
  value = input<string>('');
  /** Sets the active tab indicator color */
  color = input<string | null>(null);

  valueChange = output<string>();

  protected readonly _activeValue = signal<string>('');

  constructor() {
    effect(() => {
      const v = this.value();
      if (v) {
        this._activeValue.set(v);
      } else {
        // Default to first tab
        const tabs = this._normalizedTabs();
        if (tabs.length > 0) {
          this._activeValue.set(tabs[0].value);
        }
      }
    });
  }

  protected _normalizedTabs(): GcTab[] {
    return this.tabs().map((t) =>
      typeof t === 'string' ? { label: t, value: t } : t
    );
  }

  protected _selectTab(tab: GcTab): void {
    if (tab.disabled) return;
    this._activeValue.set(tab.value);
    this.valueChange.emit(tab.value);
  }

  protected _onKeydown(event: KeyboardEvent, tabs: GcTab[], currentIndex: number): void {
    let nextIndex = -1;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      nextIndex = currentIndex + 1;
      while (nextIndex < tabs.length && tabs[nextIndex].disabled) nextIndex++;
      if (nextIndex >= tabs.length) {
        nextIndex = 0;
        while (nextIndex < tabs.length && tabs[nextIndex].disabled) nextIndex++;
      }
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      nextIndex = currentIndex - 1;
      while (nextIndex >= 0 && tabs[nextIndex].disabled) nextIndex--;
      if (nextIndex < 0) {
        nextIndex = tabs.length - 1;
        while (nextIndex >= 0 && tabs[nextIndex].disabled) nextIndex--;
      }
    } else if (event.key === 'Home') {
      event.preventDefault();
      nextIndex = 0;
      while (nextIndex < tabs.length && tabs[nextIndex].disabled) nextIndex++;
    } else if (event.key === 'End') {
      event.preventDefault();
      nextIndex = tabs.length - 1;
      while (nextIndex >= 0 && tabs[nextIndex].disabled) nextIndex--;
    }

    if (nextIndex >= 0 && nextIndex < tabs.length && !tabs[nextIndex].disabled) {
      this._selectTab(tabs[nextIndex]);
      // Focus the button
      const buttons = (event.target as HTMLElement)
        .closest('[role="tablist"]')
        ?.querySelectorAll<HTMLElement>('[role="tab"]');
      buttons?.[nextIndex]?.focus();
    }
  }
}
