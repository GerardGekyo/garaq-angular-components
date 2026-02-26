import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'doc-code-block',
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.css',
})
export class CodeBlockComponent {
  readonly code = input.required<string>();
  protected readonly copied = signal(false);

  protected copyCode(): void {
    navigator.clipboard.writeText(this.code());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
