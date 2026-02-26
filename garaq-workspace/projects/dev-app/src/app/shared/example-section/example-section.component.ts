import { Component, input } from '@angular/core';
import { CodeBlockComponent } from '../code-block/code-block.component';

@Component({
  selector: 'doc-example',
  imports: [CodeBlockComponent],
  templateUrl: './example-section.component.html',
  styleUrl: './example-section.component.css',
})
export class ExampleSectionComponent {
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly code = input.required<string>();
}
