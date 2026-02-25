import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ButtonVariant = 'filled' | 'outlined' | 'text';
export type ButtonColor = 'primary' | 'danger' | 'success' | 'warning';

@Component({
  selector: 'gc-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'button',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '[attr.disabled]': 'disabled() || null',
    '[attr.aria-disabled]': 'disabled()',
    '[class.filled]': 'variant() === "filled"',
    '[class.outlined]': 'variant() === "outlined"',
    '[class.text]': 'variant() === "text"',
    '[style.--garaq-btn-bg]': 'finalBackground()',
    '[style.--garaq-btn-text]': 'finalTextColor()',
    '[style.--garaq-btn-radius]': 'radius()',
  },
})
export class ButtonComponent {
  variant = input<ButtonVariant>('filled');
  color = input<ButtonColor>('primary');
  disabled = input<boolean>(false);

  backgroundColor = input<string | null>(null);
  textColor = input<string | null>(null);
  radius = input<string>('6px');

  private readonly colorMap: Record<ButtonColor, { bg: string; text: string }> = {
    primary: { bg: '#2563eb', text: '#ffffff' },
    danger: { bg: '#dc2626', text: '#ffffff' },
    success: { bg: '#16a34a', text: '#ffffff' },
    warning: { bg: '#f59e0b', text: '#000000' },
  };

  protected readonly finalBackground = computed(
    () => this.backgroundColor() ?? this.colorMap[this.color()].bg,
  );

  protected readonly finalTextColor = computed(
    () => this.textColor() ?? this.colorMap[this.color()].text,
  );
}
