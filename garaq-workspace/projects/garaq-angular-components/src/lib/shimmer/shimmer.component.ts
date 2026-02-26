import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ShimmerShape = 'rectangle' | 'circle' | 'pill';

@Component({
  selector: 'gc-shimmer',
  // The host element itself IS the shimmer — no inner content needed.
  template: '',
  styleUrls: ['./shimmer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // Purely decorative — screen readers skip this element.
    // The parent container should handle loading announcements
    // with role="status" or aria-busy="true".
    'aria-hidden': 'true',
    '[class.gc-shape-rectangle]': 'shape() === "rectangle"',
    '[class.gc-shape-circle]': 'shape() === "circle"',
    '[class.gc-shape-pill]': 'shape() === "pill"',
    // Apply inline styles only when the user explicitly passes a value.
    // When null, CSS defaults (100% width, 1rem height) apply —
    // allowing Tailwind classes or external CSS to take control.
    '[style.width]': 'width()',
    '[style.height]': 'height()',
    '[style.--gc-shimmer-base]': 'color()',
  },
})
export class ShimmerComponent {
  shape = input<ShimmerShape>('rectangle');
  /** Sets the shimmer base color */
  color = input<string | null>(null);

  /**
   * Explicit width (e.g. '100%', '200px', '8rem').
   * When omitted, CSS default `width: 100%` applies.
   * You can also use Tailwind classes like `class="w-32"` instead.
   */
  width = input<string | null>(null);

  /**
   * Explicit height (e.g. '1rem', '3rem', '160px').
   * When omitted, CSS default `height: 1rem` applies.
   * You can also use Tailwind classes like `class="h-4"` instead.
   */
  height = input<string | null>(null);
}
