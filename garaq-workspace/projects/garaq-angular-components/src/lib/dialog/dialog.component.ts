import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'gc-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.gc-open]': 'open()',
  },
})
export class DialogComponent {
  open = input(false, { transform: booleanAttribute });
  title = input<string>('');
  /** Maximum width of the dialog panel (e.g. '32rem', '500px') */
  maxWidth = input<string | null>(null);

  openChange = output<boolean>();
  closed = output<void>();

  protected readonly _dialogEl = viewChild<ElementRef<HTMLDialogElement>>('dialogEl');

  constructor() {
    effect(() => {
      const el = this._dialogEl()?.nativeElement;
      if (!el) return;
      if (this.open()) {
        if (!el.open) el.showModal();
      } else {
        if (el.open) el.close();
      }
    });
  }

  protected _onClose(): void {
    this.openChange.emit(false);
    this.closed.emit();
  }

  protected _onBackdropClick(event: MouseEvent): void {
    const el = this._dialogEl()?.nativeElement;
    if (event.target === el) {
      this._onClose();
    }
  }

  protected _onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this._onClose();
    }
  }
}
