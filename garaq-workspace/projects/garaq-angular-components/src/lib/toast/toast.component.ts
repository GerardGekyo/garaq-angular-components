import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  Injectable,
  input,
  output,
  signal,
} from '@angular/core';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface GcToast {
  id: number;
  message: string;
  variant: ToastVariant;
  duration: number;
}

/**
 * Service to push toasts from anywhere in the app.
 * Usage: inject(ToastService).show('Saved!', 'success');
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private _nextId = 0;
  readonly toasts = signal<GcToast[]>([]);

  show(message: string, variant: ToastVariant = 'info', duration = 4000): void {
    const id = this._nextId++;
    const toast: GcToast = { id, message, variant, duration };
    this.toasts.update((t) => [...t, toast]);

    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
  }

  dismiss(id: number): void {
    this.toasts.update((t) => t.filter((item) => item.id !== id));
  }
}

/**
 * Container component — place once in your app root.
 * <gc-toast-container />
 */
@Component({
  selector: 'gc-toast-container',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-live': 'polite',
    'aria-atomic': 'false',
  },
})
export class ToastContainerComponent {
  constructor(protected _service: ToastService) {}

  protected _dismiss(id: number): void {
    this._service.dismiss(id);
  }
}

/**
 * Standalone toast for manual usage without the service.
 * <gc-toast variant="success">Saved!</gc-toast>
 */
@Component({
  selector: 'gc-toast',
  template: `
    <div class="gc-toast-body" [class]="'gc-variant-' + variant()">
      <span class="gc-toast-message"><ng-content /></span>
      @if (dismissible()) {
        <button type="button" class="gc-toast-close" aria-label="Dismiss" (click)="dismissed.emit()">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="4" y1="4" x2="12" y2="12" /><line x1="12" y1="4" x2="4" y2="12" />
          </svg>
        </button>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      font-family: inherit;
      box-sizing: border-box;
    }
    .gc-toast-body {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);
      animation: gc-toast-in 0.25s ease;
    }
    .gc-variant-info { background: #1e293b; color: #f1f5f9; }
    .gc-variant-success { background: #16a34a; color: #fff; }
    .gc-variant-warning { background: #d97706; color: #fff; }
    .gc-variant-error { background: #dc2626; color: #fff; }
    .gc-toast-message {
      flex: 1;
      font-size: 0.8125rem;
      line-height: 1.25rem;
      font-weight: 500;
    }
    .gc-toast-close {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 1.25rem;
      height: 1.25rem;
      padding: 0;
      border: none;
      background: none;
      color: currentColor;
      opacity: 0.6;
      cursor: pointer;
      border-radius: 0.25rem;
      transition: opacity 0.15s ease;
    }
    .gc-toast-close:hover { opacity: 1; }
    .gc-toast-close svg { width: 0.75rem; height: 0.75rem; }
    @keyframes gc-toast-in {
      from { opacity: 0; transform: translateY(0.5rem) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @media (prefers-reduced-motion: reduce) {
      .gc-toast-body { animation: none; }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  variant = input<ToastVariant>('info');
  dismissible = input(false, { transform: booleanAttribute });

  dismissed = output<void>();
}
