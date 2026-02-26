import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

export type CardVariant = 'default' | 'elevated' | 'ghost' | 'outline';
export type CardPadding = 'none' | 'sm' | 'default' | 'lg';

@Component({
  selector: 'gc-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.gc-variant-default]': 'variant() === "default"',
    '[class.gc-variant-elevated]': 'variant() === "elevated"',
    '[class.gc-variant-ghost]': 'variant() === "ghost"',
    '[class.gc-variant-outline]': 'variant() === "outline"',
    '[class.gc-padding-none]': 'padding() === "none"',
    '[class.gc-padding-sm]': 'padding() === "sm"',
    '[class.gc-padding-default]': 'padding() === "default"',
    '[class.gc-padding-lg]': 'padding() === "lg"',
    '[style.--gc-card-bg]': 'background()',
    '[style.--gc-card-color]': 'color()',
    '[style.--gc-card-border]': 'borderColor()',
    '[style.--gc-card-radius]': 'radius()',
  },
})
export class CardComponent {
  variant = input<CardVariant>('default');
  padding = input<CardPadding>('default');
  background = input<string | null>(null);
  color = input<string | null>(null);
  /** Sets the card border color */
  borderColor = input<string | null>(null);
  /** Sets the card border radius (e.g. '1rem', '12px') */
  radius = input<string | null>(null);
}
