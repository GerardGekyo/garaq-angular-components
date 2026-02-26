import { Component } from '@angular/core';
import { BadgeComponent, ButtonComponent, TooltipComponent } from 'garaq-angular-components';
import { ExampleSectionComponent } from '../../shared/example-section/example-section.component';

@Component({
  selector: 'doc-tooltip',
  imports: [TooltipComponent, ButtonComponent, BadgeComponent, ExampleSectionComponent],
  templateUrl: './tooltip-doc.component.html',
  styleUrl: './tooltip-doc.component.css',
})
export class TooltipDocComponent {
  readonly placementsCode = `<gc-tooltip content="Tooltip arriba" placement="top">
  <gc-button variant="outline">Top</gc-button>
</gc-tooltip>
<gc-tooltip content="Tooltip abajo" placement="bottom">
  <gc-button variant="outline">Bottom</gc-button>
</gc-tooltip>`;

  readonly delayCode = `<gc-tooltip content="Aparece de inmediato">
  <gc-button size="sm">Sin delay</gc-button>
</gc-tooltip>
<gc-tooltip content="Aparece después de 500ms" [delay]="500">
  <gc-button size="sm">Delay 500ms</gc-button>
</gc-tooltip>
<gc-tooltip content="Nunca verás esto" disabled>
  <gc-button size="sm">Disabled</gc-button>
</gc-tooltip>`;

  readonly colorsCode = `<gc-tooltip content="Tooltip violeta" background="#7c3aed">
  <gc-button background="#7c3aed">Violeta</gc-button>
</gc-tooltip>`;

  readonly richCode = `<gc-tooltip>
  <gc-button variant="outline">Hover para ver más</gc-button>
  <span gcTooltipContent class="flex flex-col gap-1">
    <strong>Título del tooltip</strong>
    <span class="opacity-80 text-xs">Descripción con detalle.</span>
  </span>
</gc-tooltip>`;

  readonly contextCode = `<gc-tooltip content="Eliminar permanentemente" background="#dc2626">
  <gc-button background="#dc2626" size="sm">
    <svg>...</svg> Eliminar
  </gc-button>
</gc-tooltip>`;
}
