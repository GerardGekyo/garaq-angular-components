import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

type ButtonColor = 'primary' | 'danger' | 'success' | 'warning';

@Component({
  selector: 'garaq-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--garaq-btn-bg]': 'finalBackground()',
    '[style.--garaq-btn-text]': 'finalTextColor()',
    '[style.--garaq-btn-radius]': 'radius()',
  },
})
export class ButtonComponent {
  variant = input<'filled' | 'outlined' | 'text'>('filled');

  color = input<ButtonColor>('primary');

  backgroundColor = input<string | null>(null);
  textColor = input<string | null>(null);
  radius = input<string>('6px');

  private colorMap: Record<ButtonColor, { bg: string; text: string }> = {
    primary: { bg: '#2563eb', text: '#ffffff' },
    danger: { bg: '#dc2626', text: '#ffffff' },
    success: { bg: '#16a34a', text: '#ffffff' },
    warning: { bg: '#f59e0b', text: '#000000' },
  };

  finalBackground = computed(() => {
    return this.backgroundColor() ?? this.colorMap[this.color()].bg;
  });

  finalTextColor = computed(() => {
    return this.textColor() ?? this.colorMap[this.color()].text;
  });
}
