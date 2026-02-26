import { Component, signal } from '@angular/core';
import { BadgeComponent, InputComponent } from 'garaq-angular-components';
import { ExampleSectionComponent } from '../../shared/example-section/example-section.component';

@Component({
  selector: 'doc-input',
  imports: [InputComponent, BadgeComponent, ExampleSectionComponent],
  templateUrl: './input-doc.component.html',
  styleUrl: './input-doc.component.css',
})
export class InputDocComponent {
  protected showPassword = signal(false);

  readonly charLimitCode = `<gc-input inputLabel="Username" placeholder="Tu nombre de usuario" [maxLength]="20" />
<gc-input inputLabel="Bio" placeholder="Cuéntanos..." inputDescription="Aparece en tu perfil." [maxLength]="120" />`;

  readonly statesCode = `<gc-input inputLabel="Default" placeholder="Escribe algo..." />
<gc-input inputLabel="Con descripción" placeholder="email" inputDescription="Texto de ayuda." />
<gc-input inputLabel="Inválido" invalid />
<gc-input inputLabel="Deshabilitado" disabled />`;

  readonly prefixSuffixCode = `<gc-input inputLabel="URL" placeholder="mi-sitio">
  <span gcPrefix>https://</span>
</gc-input>

<gc-input inputLabel="Precio" placeholder="0.00">
  <span gcPrefix>$</span>
  <span gcSuffix>USD</span>
</gc-input>

<gc-input inputLabel="Búsqueda" placeholder="Buscar..." type="search">
  <svg gcPrefix>...</svg>
</gc-input>

<gc-input inputLabel="Contraseña" [type]="showPassword() ? 'text' : 'password'">
  <button gcSuffix (click)="showPassword.set(!showPassword())">...</button>
</gc-input>`;

  readonly colorCode = `<gc-input inputLabel="Tema violeta" placeholder="Focus me..." color="#7c3aed" />`;
}
