import { Component, signal } from '@angular/core';
import { BadgeComponent, GcTab, TabsComponent } from 'garaq-angular-components';
import { ExampleSectionComponent } from '../../shared/example-section/example-section.component';

@Component({
  selector: 'doc-tabs',
  imports: [TabsComponent, BadgeComponent, ExampleSectionComponent],
  templateUrl: './tabs-doc.component.html',
  styleUrl: './tabs-doc.component.css',
})
export class TabsDocComponent {
  protected readonly simpleTabs: string[] = ['General', 'Seguridad', 'Notificaciones'];
  protected readonly richTabs: GcTab[] = [
    { label: 'Cuenta', value: 'account' },
    { label: 'Seguridad', value: 'security' },
    { label: 'Facturación', value: 'billing' },
    { label: 'API (pronto)', value: 'api', disabled: true },
  ];
  protected selectedTab = signal<string>('account');

  readonly simpleCode = `simpleTabs = ['General', 'Seguridad', 'Notificaciones'];

<gc-tabs [tabs]="simpleTabs" />`;

  readonly richCode = `richTabs: GcTab[] = [
  { label: 'Cuenta', value: 'account' },
  { label: 'Seguridad', value: 'security' },
  { label: 'API (pronto)', value: 'api', disabled: true },
];
selectedTab = signal('account');

<gc-tabs
  [tabs]="richTabs"
  [value]="selectedTab()"
  (valueChange)="selectedTab.set($event)"
/>`;

  readonly colorCode = `<gc-tabs [tabs]="simpleTabs" color="#16a34a" />`;

  readonly variedCode = `<gc-tabs [tabs]="['Inicio', 'Perfil', 'Config']" color="#7c3aed" />
<gc-tabs [tabs]="['Fotos', 'Videos', 'Audio']" color="#ec4899" />
<gc-tabs [tabs]="['Lun', 'Mar', 'Mié', 'Jue', 'Vie']" color="#ea580c" />`;
}
