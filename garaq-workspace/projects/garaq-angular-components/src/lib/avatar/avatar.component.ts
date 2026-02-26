import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';

export type AvatarSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';

@Component({
  selector: 'gc-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.gc-size-xs]': 'size() === "xs"',
    '[class.gc-size-sm]': 'size() === "sm"',
    '[class.gc-size-default]': 'size() === "default"',
    '[class.gc-size-lg]': 'size() === "lg"',
    '[class.gc-size-xl]': 'size() === "xl"',
    '[style.--gc-avatar-bg]': 'background()',
    '[style.--gc-avatar-color]': 'color()',
  },
})
export class AvatarComponent {
  src = input<string | null>(null);
  alt = input<string>('');
  name = input<string>('');
  size = input<AvatarSize>('default');
  /** Sets the fallback background color */
  background = input<string | null>(null);
  /** Sets the fallback text color */
  color = input<string | null>(null);

  protected readonly _imgError = signal(false);

  protected readonly _initials = computed(() => {
    const n = this.name().trim();
    if (!n) return '?';
    const parts = n.split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return n[0].toUpperCase();
  });

  protected readonly _showImage = computed(() =>
    !!this.src() && !this._imgError()
  );

  protected _onImgError(): void {
    this._imgError.set(true);
  }
}
