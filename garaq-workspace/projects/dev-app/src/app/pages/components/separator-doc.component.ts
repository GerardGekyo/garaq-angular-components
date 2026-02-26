import { Component } from '@angular/core';
import { BadgeComponent, SeparatorComponent } from 'garaq-angular-components';
import { ExampleSectionComponent } from '../../shared/example-section/example-section.component';

@Component({
  selector: 'doc-separator',
  imports: [SeparatorComponent, BadgeComponent, ExampleSectionComponent],
  templateUrl: './separator-doc.component.html',
  styleUrl: './separator-doc.component.css',
})
export class SeparatorDocComponent {
  readonly horizontalCode = `<p>Contenido arriba</p>
<gc-separator />
<p>Contenido abajo</p>`;

  readonly labelCode = `<gc-separator label="O" />
<gc-separator label="Continuar con" />`;

  readonly verticalCode = `<div class="flex items-center gap-4 h-8">
  <span>Inicio</span>
  <gc-separator orientation="vertical" />
  <span>Productos</span>
  <gc-separator orientation="vertical" />
  <span>Contacto</span>
</div>`;

  readonly colorCode = `<gc-separator color="#7c3aed" />
<gc-separator label="Violeta" color="#7c3aed" />
<gc-separator color="#ec4899" />`;
}
