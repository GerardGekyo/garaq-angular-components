import { Component } from '@angular/core';
import { BadgeComponent, TextareaComponent } from 'garaq-angular-components';
import { ExampleSectionComponent } from '../../shared/example-section/example-section.component';

@Component({
  selector: 'doc-textarea',
  imports: [TextareaComponent, BadgeComponent, ExampleSectionComponent],
  templateUrl: './textarea-doc.component.html',
  styleUrl: './textarea-doc.component.css',
})
export class TextareaDocComponent {
  readonly statesCode = `<gc-textarea inputLabel="Default" placeholder="Escribe algo..." />

<gc-textarea
  inputLabel="Con descripción y límite"
  placeholder="Cuéntanos sobre ti..."
  inputDescription="Aparece en tu perfil público."
  [maxLength]="200"
/>

<gc-textarea inputLabel="Más filas" [rows]="6" [maxLength]="500" />
<gc-textarea inputLabel="Inválido" invalid />
<gc-textarea inputLabel="Deshabilitado" disabled />`;
}
