import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'gc-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'alert',
    '[class.gc-variant-info]': 'variant() === "info"',
    '[class.gc-variant-success]': 'variant() === "success"',
    '[class.gc-variant-warning]': 'variant() === "warning"',
    '[class.gc-variant-error]': 'variant() === "error"',
    '[class.gc-dismissed]': '_dismissed()',
    '[style.--gc-alert-color]': 'color()',
  },
})
export class AlertComponent {
  variant = input<AlertVariant>('info');
  title = input<string>('');
  dismissible = input(false, { transform: booleanAttribute });
  /** Sets the accent color (border-left, icon, title) */
  color = input<string | null>(null);

  dismissed = output<void>();

  protected readonly _dismissed = signal(false);

  protected _dismiss(): void {
    this._dismissed.set(true);
    this.dismissed.emit();
  }
}
