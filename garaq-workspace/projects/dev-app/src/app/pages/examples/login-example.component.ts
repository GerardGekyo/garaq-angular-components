import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CardComponent,
  InputComponent,
  CheckboxComponent,
  ButtonComponent,
  SeparatorComponent,
  AlertComponent,
  SpinnerComponent,
} from 'garaq-angular-components';

@Component({
  selector: 'example-login',
  imports: [
    RouterLink,
    CardComponent,
    InputComponent,
    CheckboxComponent,
    ButtonComponent,
    SeparatorComponent,
    AlertComponent,
    SpinnerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-example.component.html',
  styleUrls: ['./login-example.component.css'],
})
export class LoginExampleComponent {
  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly showPassword = signal(false);
  protected readonly rememberMe = signal(false);
  protected readonly loading = signal(false);
  protected readonly showError = signal(false);

  protected onLogin(): void {
    if (this.loading()) return;
    this.showError.set(false);
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.showError.set(true);
    }, 1500);
  }
}
