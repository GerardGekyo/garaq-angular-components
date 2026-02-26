import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  numberAttribute,
  OnDestroy,
  signal,
} from '@angular/core';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'gc-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.gc-open]': '_isOpen()',
    '[class.gc-placement-top]': 'placement() === "top"',
    '[class.gc-placement-bottom]': 'placement() === "bottom"',
    '[class.gc-placement-left]': 'placement() === "left"',
    '[class.gc-placement-right]': 'placement() === "right"',
    '(mouseenter)': '_show()',
    '(mouseleave)': '_hide()',
    '[style.--gc-tooltip-bg]': 'background()',
    '[style.--gc-tooltip-color]': 'color()',
    '(focusin)': '_show()',
    '(focusout)': '_hide()',
  },
})
export class TooltipComponent implements OnDestroy {
  private static _count = 0;

  content = input<string>('');
  placement = input<TooltipPlacement>('top');
  /** Delay in ms before the tooltip appears */
  delay = input(0, { transform: numberAttribute });
  disabled = input(false, { transform: booleanAttribute });
  /** Sets the tooltip background color */
  background = input<string | null>(null);
  /** Sets the tooltip text color */
  color = input<string | null>(null);

  protected readonly _id = `gc-tooltip-${++TooltipComponent._count}`;
  protected readonly _isOpen = signal(false);

  private _timer: ReturnType<typeof setTimeout> | null = null;

  protected _show(): void {
    if (this.disabled()) return;
    const d = this.delay();
    if (d > 0) {
      this._timer = setTimeout(() => this._isOpen.set(true), d);
    } else {
      this._isOpen.set(true);
    }
  }

  protected _hide(): void {
    if (this._timer !== null) {
      clearTimeout(this._timer);
      this._timer = null;
    }
    this._isOpen.set(false);
  }

  ngOnDestroy(): void {
    this._hide();
  }
}
