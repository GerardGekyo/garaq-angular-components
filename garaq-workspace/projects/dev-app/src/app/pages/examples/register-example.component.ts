import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CardComponent,
  AvatarComponent,
  InputComponent,
  RadioButtonComponent,
  CheckboxComponent,
  SwitchButtonComponent,
  ButtonComponent,
  AlertComponent,
  TooltipComponent,
  SpinnerComponent,
} from 'garaq-angular-components';

@Component({
  selector: 'example-register',
  imports: [
    RouterLink,
    CardComponent,
    AvatarComponent,
    InputComponent,
    RadioButtonComponent,
    CheckboxComponent,
    SwitchButtonComponent,
    ButtonComponent,
    AlertComponent,
    TooltipComponent,
    SpinnerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register-example.component.html',
  styleUrls: ['./register-example.component.css'],
})
export class RegisterExampleComponent {
  protected readonly step = signal(1);
  protected readonly firstName = signal('');
  protected readonly lastName = signal('');
  protected readonly email = signal('');
  protected readonly accountType = signal<string>('personal');
  protected readonly password = signal('');
  protected readonly confirmPassword = signal('');
  protected readonly acceptTerms = signal(false);
  protected readonly newsletter = signal(true);
  protected readonly loading = signal(false);
  protected readonly validationErrors = signal<string[]>([]);

  protected readonly fullName = computed(() => {
    const first = this.firstName().trim();
    const last = this.lastName().trim();
    return [first, last].filter(Boolean).join(' ');
  });

  protected readonly passwordMismatch = computed(() => {
    const confirm = this.confirmPassword();
    return confirm.length > 0 && confirm !== this.password();
  });

  protected nextStep(): void {
    const errors: string[] = [];
    if (!this.firstName().trim()) errors.push('El nombre es obligatorio.');
    if (!this.lastName().trim()) errors.push('El apellido es obligatorio.');
    if (!this.email().trim()) errors.push('El email es obligatorio.');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email()))
      errors.push('El email no es válido.');

    this.validationErrors.set(errors);
    if (errors.length === 0) {
      this.step.set(2);
    }
  }

  protected onRegister(): void {
    if (this.loading()) return;

    const errors: string[] = [];
    if (this.password().length < 6) errors.push('La contraseña debe tener al menos 6 caracteres.');
    if (this.password() !== this.confirmPassword()) errors.push('Las contraseñas no coinciden.');
    if (!this.acceptTerms()) errors.push('Debes aceptar los términos y condiciones.');

    this.validationErrors.set(errors);
    if (errors.length > 0) return;

    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.validationErrors.set(['Este es un demo — el registro no está conectado a un servidor.']);
    }, 2000);
  }
}
