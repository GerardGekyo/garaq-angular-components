import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

export type SeparatorOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'gc-separator',
  template: `@if (label()) { <span class="gc-label">{{ label() }}</span> }`,
  styleUrls: ['./separator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'separator',
    '[class.gc-horizontal]': 'orientation() === "horizontal"',
    '[class.gc-vertical]': 'orientation() === "vertical"',
    '[class.gc-has-label]': '!!label()',
    '[attr.aria-orientation]': 'orientation()',
    '[style.--gc-separator-color]': 'color()',
  },
})
export class SeparatorComponent {
  orientation = input<SeparatorOrientation>('horizontal');
  /** Optional text label shown in the middle of the separator */
  label = input<string>('');
  /** Sets the separator line color */
  color = input<string | null>(null);
}
