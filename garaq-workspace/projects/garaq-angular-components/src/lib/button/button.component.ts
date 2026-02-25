import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ButtonVariant = 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'shadow';
export type ButtonSize = 'default' | 'xs' | 'sm' | 'lg';

@Component({
  selector: 'gc-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'button',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '[attr.disabled]': 'disabled() || null',
    '[attr.aria-disabled]': 'disabled()',
    '[class.gc-variant-default]': 'variant() === "default"',
    '[class.gc-variant-outline]': 'variant() === "outline"',
    '[class.gc-variant-secondary]': 'variant() === "secondary"',
    '[class.gc-variant-ghost]': 'variant() === "ghost"',
    '[class.gc-variant-link]': 'variant() === "link"',
    '[class.gc-variant-shadow]': 'variant() === "shadow"',
    '[class.gc-size-default]': 'size() === "default"',
    '[class.gc-size-xs]': 'size() === "xs"',
    '[class.gc-size-sm]': 'size() === "sm"',
    '[class.gc-size-lg]': 'size() === "lg"',
    '[class.gc-disabled]': 'disabled()',
    '[style.--gc-btn-primary]': 'background()',
    '[style.--gc-btn-primary-fg]': 'color()',
  },
})
export class ButtonComponent {
  variant = input<ButtonVariant>('default');
  size = input<ButtonSize>('default');
  disabled = input(false, { transform: booleanAttribute });
  background = input<string | null>(null);
  color = input<string | null>(null);
}
