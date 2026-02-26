import { Component } from '@angular/core';
import { BadgeComponent, ButtonComponent, SpinnerComponent } from 'garaq-angular-components';
import { ExampleSectionComponent } from '../../shared/example-section/example-section.component';

@Component({
  selector: 'doc-spinner',
  imports: [SpinnerComponent, BadgeComponent, ButtonComponent, ExampleSectionComponent],
  templateUrl: './spinner-doc.component.html',
  styleUrl: './spinner-doc.component.css',
})
export class SpinnerDocComponent {
  readonly sizesCode = `<gc-spinner size="xs" />
<gc-spinner size="sm" />
<gc-spinner />
<gc-spinner size="lg" />`;

  readonly animationsCode = `<gc-spinner animation="spin" size="lg" />
<gc-spinner animation="pulse" size="lg" />
<gc-spinner animation="bounce" size="lg" />
<gc-spinner animation="none" size="lg" />`;

  readonly colorsCode = `<gc-spinner />
<gc-spinner color="#7c3aed" />
<gc-spinner color="#16a34a" />
<gc-spinner color="#dc2626" />
<gc-spinner color="#f59e0b" />`;

  readonly customCode = `<gc-spinner size="lg">
  <svg>...</svg>
</gc-spinner>

<gc-spinner size="lg" animation="bounce">
  <span>emoji</span>
</gc-spinner>

<gc-spinner size="lg" animation="pulse" color="#7c3aed">
  <span class="font-black text-lg">G</span>
</gc-spinner>`;

  readonly contextCode = `<gc-button>
  <gc-spinner size="xs" color="#ffffff" />
  Guardando...
</gc-button>
<gc-button variant="outline">
  <gc-spinner size="xs" />
  Cargando
</gc-button>`;
}
