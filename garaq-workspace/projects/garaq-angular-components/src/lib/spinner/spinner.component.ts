import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type SpinnerSize = 'xs' | 'sm' | 'default' | 'lg';
export type SpinnerAnimation = 'spin' | 'pulse' | 'bounce' | 'none';

@Component({
  selector: 'gc-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'status',
    '[attr.aria-label]': 'ariaLabel()',
    '[class.gc-size-xs]': 'size() === "xs"',
    '[class.gc-size-sm]': 'size() === "sm"',
    '[class.gc-size-default]': 'size() === "default"',
    '[class.gc-size-lg]': 'size() === "lg"',
    '[class.gc-anim-spin]': 'animation() === "spin"',
    '[class.gc-anim-pulse]': 'animation() === "pulse"',
    '[class.gc-anim-bounce]': 'animation() === "bounce"',
    '[style.--gc-spinner-color]': 'color()',
  },
})
export class SpinnerComponent {
  size = input<SpinnerSize>('default');
  animation = input<SpinnerAnimation>('spin');
  color = input<string | null>(null);
  ariaLabel = input<string>('Loading');
}
