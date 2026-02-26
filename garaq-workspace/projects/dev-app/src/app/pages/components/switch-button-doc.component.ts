import { Component, signal } from '@angular/core';
import { BadgeComponent, SwitchButtonComponent } from 'garaq-angular-components';
import { ExampleSectionComponent } from '../../shared/example-section/example-section.component';

@Component({
  selector: 'doc-switch-button',
  imports: [SwitchButtonComponent, BadgeComponent, ExampleSectionComponent],
  templateUrl: './switch-button-doc.component.html',
  styleUrl: './switch-button-doc.component.css',
})
export class SwitchButtonDocComponent {
  protected darkMode = signal(false);
  protected notifications = signal(true);
  protected autoSave = signal(false);

  readonly defaultCode = `<gc-switch-button
  label="Modo oscuro"
  description="Activar el tema oscuro."
  [checked]="darkMode()"
  (checkedChange)="darkMode.set($event)"
/>`;

  readonly sizesCode = `<gc-switch-button size="sm" label="Small" checked />
<gc-switch-button size="default" label="Default" checked />
<gc-switch-button size="lg" label="Large" checked />`;

  readonly projectedCode = `<gc-switch-button>
  <span class="font-medium">Aceptar términos</span>
  <span class="text-xs text-gray-500">Términos y condiciones.</span>
</gc-switch-button>`;

  readonly colorsCode = `<gc-switch-button label="Verde" color="#16a34a" checked />
<gc-switch-button label="Violeta" color="#8b5cf6" checked />
<gc-switch-button label="Rosa" color="#ec4899" checked />
<gc-switch-button label="Naranja" color="#ea580c" checked />`;

  readonly disabledCode = `<gc-switch-button label="Off disabled" disabled />
<gc-switch-button label="On disabled" checked disabled />`;
}
