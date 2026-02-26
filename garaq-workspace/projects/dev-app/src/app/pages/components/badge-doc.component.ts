import { Component } from '@angular/core';
import { BadgeComponent, BadgeVariant } from 'garaq-angular-components';
import { ExampleSectionComponent } from '../../shared/example-section/example-section.component';

@Component({
  selector: 'doc-badge',
  imports: [BadgeComponent, ExampleSectionComponent],
  templateUrl: './badge-doc.component.html',
  styleUrl: './badge-doc.component.css',
})
export class BadgeDocComponent {
  protected readonly variants: BadgeVariant[] = ['default', 'outline', 'secondary', 'ghost', 'link', 'shadow'];

  readonly variantsCode = `@for (v of variants; track v) {
  <gc-badge [variant]="v">{{ v }}</gc-badge>
}`;

  readonly sizesCode = `<gc-badge size="sm">Small</gc-badge>
<gc-badge>Default</gc-badge>
<gc-badge size="lg">Large</gc-badge>`;

  readonly matrixCode = `@for (v of variants; track v) {
  <gc-badge [variant]="v" size="sm">Small</gc-badge>
  <gc-badge [variant]="v">Default</gc-badge>
  <gc-badge [variant]="v" size="lg">Large</gc-badge>
}`;

  readonly colorsCode = `<gc-badge background="#7c3aed">Violet</gc-badge>
<gc-badge variant="outline" background="#dc2626">Red outline</gc-badge>
<gc-badge variant="shadow" background="#16a34a">Green shadow</gc-badge>
<gc-badge variant="ghost" background="#f59e0b" color="#000">Amber ghost</gc-badge>`;

  readonly contextCode = `<gc-badge background="#16a34a">Enviado</gc-badge>
<gc-badge variant="outline" background="#f59e0b" color="#92400e">En proceso</gc-badge>
<gc-badge variant="secondary">Pendiente</gc-badge>
<gc-badge background="#dc2626">Cancelado</gc-badge>`;
}
