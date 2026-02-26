import { Component, inject } from '@angular/core';
import { BadgeComponent, ButtonComponent, ToastComponent, ToastService } from 'garaq-angular-components';
import { ExampleSectionComponent } from '../../shared/example-section/example-section.component';

@Component({
  selector: 'doc-toast',
  imports: [ToastComponent, ButtonComponent, BadgeComponent, ExampleSectionComponent],
  templateUrl: './toast-doc.component.html',
  styleUrl: './toast-doc.component.css',
})
export class ToastDocComponent {
  private readonly _toastService = inject(ToastService);

  showToast(variant: 'info' | 'success' | 'warning' | 'error'): void {
    const messages: Record<string, string> = {
      info: 'Este es un mensaje informativo.',
      success: 'Operación completada con éxito.',
      warning: 'Atención: revisa los datos ingresados.',
      error: 'Ha ocurrido un error inesperado.',
    };
    this._toastService.show(messages[variant], variant);
  }

  readonly serviceCode = `private readonly _toastService = inject(ToastService);

showToast(variant: 'info' | 'success' | 'warning' | 'error'): void {
  this._toastService.show('Mensaje...', variant);
}

// En template:
<gc-button (click)="showToast('info')">Info</gc-button>
<gc-button (click)="showToast('success')">Success</gc-button>

// En app root (una sola vez):
<gc-toast-container />`;

  readonly standaloneCode = `<gc-toast variant="info">Mensaje informativo.</gc-toast>
<gc-toast variant="success">Guardado correctamente.</gc-toast>
<gc-toast variant="warning">Revisa tu conexión.</gc-toast>
<gc-toast variant="error">Error al procesar.</gc-toast>`;

  readonly dismissibleCode = `<gc-toast variant="success" dismissible>
  Puedes cerrar este toast.
</gc-toast>
<gc-toast variant="error" dismissible>
  Error con opción de cerrar.
</gc-toast>`;
}
