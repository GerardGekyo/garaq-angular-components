import { Component, signal } from '@angular/core';
import { BadgeComponent, ComboboxComponent, GcComboboxOption } from 'garaq-angular-components';
import { ExampleSectionComponent } from '../../shared/example-section/example-section.component';

@Component({
  selector: 'doc-combobox',
  imports: [ComboboxComponent, BadgeComponent, ExampleSectionComponent],
  templateUrl: './combobox-doc.component.html',
  styleUrl: './combobox-doc.component.css',
})
export class ComboboxDocComponent {
  protected readonly fruits: string[] = ['Apple', 'Banana', 'Cherry', 'Dragon fruit', 'Elderberry', 'Fig', 'Grape', 'Honeydew'];

  protected readonly countries: GcComboboxOption[] = [
    { label: 'Argentina', value: 'ar', description: 'South America' },
    { label: 'Brasil', value: 'br', description: 'South America' },
    { label: 'Colombia', value: 'co', description: 'South America' },
    { label: 'España', value: 'es', description: 'Europe' },
    { label: 'Francia', value: 'fr', description: 'Europe' },
    { label: 'México', value: 'mx', description: 'North America' },
    { label: 'Japón', value: 'jp', description: 'Asia', disabled: true },
    { label: 'Perú', value: 'pe', description: 'South America' },
  ];

  protected readonly frameworks: GcComboboxOption[] = [
    { label: 'Angular', value: 'angular', description: 'Platform for web apps' },
    { label: 'React', value: 'react', description: 'UI library by Meta' },
    { label: 'Vue', value: 'vue', description: 'Progressive framework' },
    { label: 'Svelte', value: 'svelte', description: 'Compile-time framework' },
    { label: 'Solid', value: 'solid', description: 'Reactive UI library' },
  ];

  protected selectedFruit = signal<string | null>(null);
  protected selectedCountry = signal<string | null>(null);
  protected selectedFrameworks = signal<string[]>([]);
  protected selectedTags = signal<string[]>(['angular', 'vue']);

  readonly singleCode = `<gc-combobox
  inputLabel="Fruta favorita"
  inputDescription="Escribe para buscar."
  placeholder="Buscar fruta..."
  [options]="fruits"
  [value]="selectedFruit()"
  (valueChange)="selectedFruit.set($event)"
/>`;

  readonly richCode = `countries: GcComboboxOption[] = [
  { label: 'Argentina', value: 'ar', description: 'South America' },
  { label: 'Japón', value: 'jp', description: 'Asia', disabled: true },
  ...
];

<gc-combobox
  inputLabel="País"
  placeholder="Selecciona..."
  [options]="countries"
  [value]="selectedCountry()"
  (valueChange)="selectedCountry.set($event)"
/>`;

  readonly prefixCode = `<gc-combobox inputLabel="Buscar" [options]="frameworks">
  <svg gcPrefix>...</svg>
</gc-combobox>`;

  readonly multiCode = `<gc-combobox
  mode="multiple"
  inputLabel="Frameworks"
  [options]="frameworks"
  [values]="selectedFrameworks()"
  (valuesChange)="selectedFrameworks.set($event)"
/>`;

  readonly preselectedCode = `selectedTags = signal<string[]>(['angular', 'vue']);

<gc-combobox
  mode="multiple"
  [options]="frameworks"
  [values]="selectedTags()"
  (valuesChange)="selectedTags.set($event)"
/>`;

  readonly statesCode = `<gc-combobox inputLabel="Inválido" [options]="fruits" invalid />
<gc-combobox inputLabel="Deshabilitado" [options]="fruits" disabled />`;

  readonly emptyCode = `<gc-combobox
  [options]="[]"
  emptyText="No hay opciones disponibles"
/>`;

  readonly colorCode = `<gc-combobox
  inputLabel="Tema violeta"
  [options]="fruits"
  color="#8b5cf6"
/>`;
}
