import { Component } from '@angular/core';
import { BadgeComponent, CheckboxComponent } from 'garaq-angular-components';
import { ExampleSectionComponent } from '../../shared/example-section/example-section.component';

@Component({
  selector: 'doc-checkbox',
  imports: [CheckboxComponent, BadgeComponent, ExampleSectionComponent],
  templateUrl: './checkbox-doc.component.html',
  styleUrl: './checkbox-doc.component.css',
})
export class CheckboxDocComponent {
  readonly statesCode = `<gc-checkbox label="Sin marcar" />
<gc-checkbox label="Marcado por defecto" checked />
<gc-checkbox label="Con descripción" description="Texto de ayuda." />
<gc-checkbox label="Deshabilitado" disabled />
<gc-checkbox label="Deshabilitado y marcado" checked disabled />`;

  readonly sizesCode = `<gc-checkbox size="sm" label="Small" />
<gc-checkbox label="Default" />
<gc-checkbox size="lg" label="Large" />`;

  readonly colorsCode = `<gc-checkbox label="Violeta" color="#7c3aed" checked />
<gc-checkbox label="Verde" color="#16a34a" checked />
<gc-checkbox label="Rojo" color="#dc2626" checked />
<gc-checkbox label="Amarillo" color="#f59e0b" checked />`;

  readonly richCode = `<gc-checkbox checked>
  <span class="font-medium">
    Acepto los <a href="#">términos y condiciones</a>
  </span>
  <p class="text-xs text-gray-500">Política de privacidad.</p>
</gc-checkbox>`;
}
