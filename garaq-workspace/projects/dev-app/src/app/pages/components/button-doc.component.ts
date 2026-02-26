import { Component } from '@angular/core';
import { BadgeComponent, ButtonComponent, ButtonVariant } from 'garaq-angular-components';
import { ExampleSectionComponent } from '../../shared/example-section/example-section.component';

@Component({
  selector: 'doc-button',
  imports: [ButtonComponent, BadgeComponent, ExampleSectionComponent],
  templateUrl: './button-doc.component.html',
  styleUrl: './button-doc.component.css',
})
export class ButtonDocComponent {
  protected readonly variants: ButtonVariant[] = ['default', 'outline', 'secondary', 'ghost', 'link', 'shadow'];

  readonly variantsCode = `<gc-button>Default</gc-button>
<gc-button variant="outline">Outline</gc-button>
<gc-button variant="secondary">Secondary</gc-button>
<gc-button variant="shadow">Shadow</gc-button>
<gc-button variant="ghost">Ghost</gc-button>
<gc-button variant="link">Link</gc-button>`;

  readonly sizesCode = `<gc-button size="xs">Extra Small</gc-button>
<gc-button size="sm">Small</gc-button>
<gc-button>Default</gc-button>
<gc-button size="lg">Large</gc-button>`;

  readonly matrixCode = `@for (variant of variants; track variant) {
  <gc-button [variant]="variant" size="xs">XS</gc-button>
  <gc-button [variant]="variant" size="sm">SM</gc-button>
  <gc-button [variant]="variant">Default</gc-button>
  <gc-button [variant]="variant" size="lg">LG</gc-button>
}`;

  readonly disabledCode = `<gc-button disabled>Default</gc-button>
<gc-button variant="outline" disabled>Outline</gc-button>
<gc-button variant="secondary" disabled>Secondary</gc-button>`;

  readonly colorsCode = `<gc-button background="#7c3aed">Violet</gc-button>
<gc-button variant="outline" background="#dc2626">Red outline</gc-button>
<gc-button background="#16a34a">Green</gc-button>
<gc-button variant="shadow" background="#f59e0b" color="#000">Amber shadow</gc-button>`;

  readonly tailwindCode = `<gc-button class="w-full">Full width</gc-button>
<gc-button variant="outline" class="w-64">Fixed width (w-64)</gc-button>`;
}
