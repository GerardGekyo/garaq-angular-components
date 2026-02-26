import { Component, signal } from '@angular/core';
import { BadgeComponent, GcSelectOption, SelectComponent } from 'garaq-angular-components';
import { ExampleSectionComponent } from '../../shared/example-section/example-section.component';

@Component({
  selector: 'doc-select',
  imports: [SelectComponent, BadgeComponent, ExampleSectionComponent],
  templateUrl: './select-doc.component.html',
  styleUrl: './select-doc.component.css',
})
export class SelectDocComponent {
  protected readonly sizes: string[] = ['Small', 'Medium', 'Large', 'Extra Large'];
  protected readonly roles: GcSelectOption[] = [
    { label: 'Viewer', value: 'viewer', description: 'Can view content only' },
    { label: 'Editor', value: 'editor', description: 'Can edit content' },
    { label: 'Admin', value: 'admin', description: 'Full access' },
    { label: 'Owner', value: 'owner', description: 'Owner-level access', disabled: true },
  ];
  protected readonly priorities: GcSelectOption[] = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Critical', value: 'critical' },
  ];
  protected readonly countries: GcSelectOption[] = [
    { label: 'Argentina', value: 'ar' },
    { label: 'Brasil', value: 'br' },
    { label: 'Colombia', value: 'co' },
    { label: 'España', value: 'es' },
    { label: 'México', value: 'mx' },
  ];

  protected selectedSize = signal<string | null>(null);
  protected selectedRole = signal<string | null>(null);
  protected selectedPriority = signal<string | null>('medium');

  readonly basicCode = `<gc-select
  inputLabel="Talla"
  inputDescription="Selecciona tu talla."
  placeholder="Elige una talla..."
  [options]="sizes"
  [value]="selectedSize()"
  (valueChange)="selectedSize.set($event)"
/>`;

  readonly richCode = `roles: GcSelectOption[] = [
  { label: 'Viewer', value: 'viewer', description: 'Can view content only' },
  { label: 'Owner', value: 'owner', description: '...', disabled: true },
  ...
];

<gc-select inputLabel="Rol" [options]="roles" />`;

  readonly initialCode = `selectedPriority = signal<string | null>('medium');

<gc-select [options]="priorities" [value]="selectedPriority()" />`;

  readonly prefixCode = `<gc-select inputLabel="País" [options]="countries">
  <svg gcPrefix>...</svg>
</gc-select>`;

  readonly statesCode = `<gc-select inputLabel="Inválido" [options]="sizes" invalid />
<gc-select inputLabel="Deshabilitado" [options]="sizes" disabled />
<gc-select [options]="priorities" value="high" disabled />`;

  readonly emptyCode = `<gc-select [options]="[]" emptyText="No hay opciones" />`;

  readonly colorCode = `<gc-select [options]="priorities" color="#16a34a" />`;
}
