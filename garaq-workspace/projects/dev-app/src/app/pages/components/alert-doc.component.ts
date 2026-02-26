import { Component } from '@angular/core';
import { AlertComponent, BadgeComponent } from 'garaq-angular-components';
import { ExampleSectionComponent } from '../../shared/example-section/example-section.component';

@Component({
  selector: 'doc-alert',
  imports: [AlertComponent, BadgeComponent, ExampleSectionComponent],
  templateUrl: './alert-doc.component.html',
  styleUrl: './alert-doc.component.css',
})
export class AlertDocComponent {
  readonly variantsCode = `<gc-alert variant="info" title="Información">Mensaje informativo.</gc-alert>
<gc-alert variant="success" title="Éxito">Operación completada.</gc-alert>
<gc-alert variant="warning" title="Advertencia">Revisa los datos.</gc-alert>
<gc-alert variant="error" title="Error">No se pudo guardar.</gc-alert>`;

  readonly noTitleCode = `<gc-alert variant="info">Mensaje sin título.</gc-alert>
<gc-alert variant="success">Archivo subido.</gc-alert>`;

  readonly dismissibleCode = `<gc-alert variant="info" title="Tip" dismissible>
  Puedes cerrar esta alerta.
</gc-alert>`;

  readonly colorsCode = `<gc-alert title="Violeta" color="#7c3aed" dismissible>
  Alerta con color personalizado.
</gc-alert>
<gc-alert title="Rosa" color="#ec4899">
  Alerta con acento rosa.
</gc-alert>`;
}
