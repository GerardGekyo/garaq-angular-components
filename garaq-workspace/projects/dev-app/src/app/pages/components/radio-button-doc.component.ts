import { Component, signal } from '@angular/core';
import { BadgeComponent, RadioButtonComponent } from 'garaq-angular-components';
import { ExampleSectionComponent } from '../../shared/example-section/example-section.component';

@Component({
  selector: 'doc-radio-button',
  imports: [RadioButtonComponent, BadgeComponent, ExampleSectionComponent],
  templateUrl: './radio-button-doc.component.html',
  styleUrl: './radio-button-doc.component.css',
})
export class RadioButtonDocComponent {
  protected selectedPlan = signal<string>('pro');
  protected selectedColor = signal<string>('blue');
  protected selectedShipping = signal<string>('standard');

  readonly basicCode = `<gc-radio-button
  name="plan" value="free" label="Free"
  description="Acceso limitado."
  [checked]="selectedPlan() === 'free'"
  (checkedChange)="selectedPlan.set($event)"
/>
<gc-radio-button name="plan" value="pro" label="Pro" ... />
<gc-radio-button name="plan" value="enterprise" label="Enterprise" ... />`;

  readonly sizesCode = `<gc-radio-button name="size" value="sm" size="sm" label="Small" checked />
<gc-radio-button name="size" value="default" label="Default" />
<gc-radio-button name="size" value="lg" size="lg" label="Large" />`;

  readonly horizontalCode = `<div class="flex gap-6">
  <gc-radio-button name="color" value="red" label="Rojo" ... />
  <gc-radio-button name="color" value="blue" label="Azul" ... />
  <gc-radio-button name="color" value="green" label="Verde" ... />
</div>`;

  readonly colorsCode = `<gc-radio-button name="themed" value="a" label="Verde" color="#16a34a" checked />
<gc-radio-button name="themed" value="b" label="Violeta" color="#8b5cf6" />
<gc-radio-button name="themed" value="c" label="Rosa" color="#ec4899" />`;

  readonly projectedCode = `<gc-radio-button name="shipping" value="standard" ...>
  <span class="font-medium">Envío estándar</span>
  <span class="text-xs text-gray-500">5-7 días - Gratis</span>
</gc-radio-button>
<gc-radio-button name="shipping" value="express" ...>
  <span class="font-medium">Envío express</span>
  <span class="text-xs text-gray-500">1-2 días - $9.99</span>
</gc-radio-button>`;

  readonly disabledCode = `<gc-radio-button name="demo" value="a" label="Opción A" disabled />
<gc-radio-button name="demo" value="b" label="Opción B" checked disabled />`;
}
