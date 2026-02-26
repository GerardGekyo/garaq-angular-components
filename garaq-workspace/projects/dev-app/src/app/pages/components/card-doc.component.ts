import { Component } from '@angular/core';
import { BadgeComponent, ButtonComponent, CardComponent } from 'garaq-angular-components';
import { ExampleSectionComponent } from '../../shared/example-section/example-section.component';

@Component({
  selector: 'doc-card',
  imports: [CardComponent, ButtonComponent, BadgeComponent, ExampleSectionComponent],
  templateUrl: './card-doc.component.html',
  styleUrl: './card-doc.component.css',
})
export class CardDocComponent {
  readonly variantsCode = `<gc-card>
  <div gcCardHeader>...</div>
  <p>Contenido</p>
  <div gcCardFooter>
    <gc-button size="sm">Acción</gc-button>
  </div>
</gc-card>

<gc-card variant="elevated">...</gc-card>
<gc-card variant="ghost">...</gc-card>
<gc-card variant="outline">...</gc-card>`;

  readonly paddingCode = `<gc-card padding="none">...</gc-card>
<gc-card padding="sm">...</gc-card>
<gc-card>...</gc-card> <!-- default -->
<gc-card padding="lg">...</gc-card>`;

  readonly mediaCode = `<gc-card variant="elevated">
  <img gcCardMedia src="..." style="height: 160px; object-fit: cover" />
  <div gcCardHeader>
    <h3>Título</h3>
  </div>
  <div gcCardFooter>
    <gc-badge size="sm" background="#16a34a">Nuevo</gc-badge>
    <gc-button size="sm" variant="ghost">Ver más</gc-button>
  </div>
</gc-card>`;

  readonly colorsCode = `<gc-card background="#1e293b" color="#f8fafc">
  Tema oscuro
</gc-card>

<gc-card background="#fdf4ff" borderColor="#d8b4fe" radius="1.25rem">
  Tema violeta con radius personalizado
</gc-card>`;

  readonly contextCode = `<!-- Stat card -->
<gc-card variant="elevated">
  <p class="text-3xl font-bold">12,480</p>
  <p class="text-xs text-green-600">+8.2%</p>
</gc-card>

<!-- Plan card -->
<gc-card>
  <div gcCardHeader>
    <h3>Plan Pro</h3>
    <gc-badge background="#7c3aed">Activo</gc-badge>
  </div>
  <div gcCardFooter>
    <gc-button size="sm" background="#7c3aed">Administrar</gc-button>
  </div>
</gc-card>`;
}
