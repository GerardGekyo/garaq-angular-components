import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BadgeVariant = 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'shadow';
export type BadgeSize = 'sm' | 'default' | 'lg';

@Component({
  selector: 'gc-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.gc-variant-default]': 'variant() === "default"',
    '[class.gc-variant-outline]': 'variant() === "outline"',
    '[class.gc-variant-secondary]': 'variant() === "secondary"',
    '[class.gc-variant-ghost]': 'variant() === "ghost"',
    '[class.gc-variant-link]': 'variant() === "link"',
    '[class.gc-variant-shadow]': 'variant() === "shadow"',
    '[class.gc-size-sm]': 'size() === "sm"',
    '[class.gc-size-default]': 'size() === "default"',
    '[class.gc-size-lg]': 'size() === "lg"',
    '[style.--gc-badge-primary]': 'background()',
    '[style.--gc-badge-primary-fg]': 'color()',
  },
})
export class BadgeComponent {
  variant = input<BadgeVariant>('default');
  size = input<BadgeSize>('default');
  background = input<string | null>(null);
  color = input<string | null>(null);
}
