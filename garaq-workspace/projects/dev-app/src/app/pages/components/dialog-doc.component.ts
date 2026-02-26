import { Component, signal } from '@angular/core';
import { BadgeComponent, ButtonComponent, DialogComponent } from 'garaq-angular-components';
import { ExampleSectionComponent } from '../../shared/example-section/example-section.component';

@Component({
  selector: 'doc-dialog',
  imports: [DialogComponent, ButtonComponent, BadgeComponent, ExampleSectionComponent],
  templateUrl: './dialog-doc.component.html',
  styleUrl: './dialog-doc.component.css',
})
export class DialogDocComponent {
  protected dialogOpen = signal(false);
  protected dialogOpen2 = signal(false);

  readonly basicCode = `dialogOpen = signal(false);

<gc-button (click)="dialogOpen.set(true)">Abrir</gc-button>

<gc-dialog
  title="Confirmar acción"
  [open]="dialogOpen()"
  (openChange)="dialogOpen.set($event)"
>
  <p>¿Estás seguro?</p>
  <div gcDialogFooter class="flex justify-end gap-3">
    <gc-button variant="outline" (click)="dialogOpen.set(false)">Cancelar</gc-button>
    <gc-button (click)="dialogOpen.set(false)">Confirmar</gc-button>
  </div>
</gc-dialog>`;

  readonly wideCode = `<gc-dialog
  title="Términos y condiciones"
  maxWidth="40rem"
  [open]="dialogOpen()"
  (openChange)="dialogOpen.set($event)"
>
  <div class="text-sm text-gray-600 space-y-3">
    <p>Lorem ipsum...</p>
  </div>
  <div gcDialogFooter class="flex justify-end gap-3">
    <gc-button variant="outline" (click)="dialogOpen.set(false)">Cerrar</gc-button>
    <gc-button (click)="dialogOpen.set(false)">Aceptar</gc-button>
  </div>
</gc-dialog>`;
}
