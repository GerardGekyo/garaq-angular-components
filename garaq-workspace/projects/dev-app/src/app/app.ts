import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BadgeComponent, BadgeVariant, ButtonComponent, ButtonVariant, CardComponent, CheckboxComponent, InputComponent, ShimmerComponent, SpinnerComponent, TextareaComponent, TooltipComponent } from 'garaq-angular-components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonComponent, InputComponent, TextareaComponent, BadgeComponent, CheckboxComponent, SpinnerComponent, TooltipComponent, CardComponent, ShimmerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('dev-app');
  protected readonly variants: ButtonVariant[] = ['default', 'outline', 'secondary', 'ghost', 'link', 'shadow'];
  protected readonly badgeVariants: BadgeVariant[] = ['default', 'outline', 'secondary', 'ghost', 'link', 'shadow'];
  protected showPassword = signal(false);
}
