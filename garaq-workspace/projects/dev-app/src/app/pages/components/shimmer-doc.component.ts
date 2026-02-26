import { Component } from '@angular/core';
import { BadgeComponent, CardComponent, ShimmerComponent } from 'garaq-angular-components';
import { ExampleSectionComponent } from '../../shared/example-section/example-section.component';

@Component({
  selector: 'doc-shimmer',
  imports: [ShimmerComponent, CardComponent, BadgeComponent, ExampleSectionComponent],
  templateUrl: './shimmer-doc.component.html',
  styleUrl: './shimmer-doc.component.css',
})
export class ShimmerDocComponent {
  readonly shapesCode = `<gc-shimmer />
<gc-shimmer height="0.75rem" width="65%" />
<gc-shimmer shape="pill" height="2rem" width="5rem" />
<gc-shimmer shape="circle" width="3rem" height="3rem" />`;

  readonly dimensionsCode = `<!-- Via inputs -->
<gc-shimmer height="3rem" />

<!-- Via Tailwind -->
<gc-shimmer class="h-8 w-48" />

<!-- Sin nada → 100% x 1rem -->
<gc-shimmer />`;

  readonly colorsCode = `<gc-shimmer color="#ddd6fe" />
<gc-shimmer color="#fecdd3" />
<gc-shimmer color="#bbf7d0" />
<gc-shimmer color="#1e293b" />`;

  readonly cardGridCode = `@for (i of [1, 2, 3]; track i) {
  <gc-card variant="elevated">
    <gc-shimmer gcCardMedia height="10rem" />
    <div gcCardHeader class="flex flex-col gap-2">
      <gc-shimmer height="1.125rem" width="65%" />
      <gc-shimmer height="0.875rem" width="42%" />
    </div>
    <div gcCardFooter>
      <gc-shimmer shape="pill" height="1.5rem" width="4rem" />
      <gc-shimmer shape="pill" height="2rem" width="5.5rem" />
    </div>
  </gc-card>
}`;

  readonly profileListCode = `<gc-card>
  @for (i of [1, 2, 3, 4]; track i) {
    <div class="flex items-center gap-3">
      <gc-shimmer shape="circle" width="2.5rem" height="2.5rem" />
      <div class="flex flex-col gap-1.5 flex-1">
        <gc-shimmer height="0.875rem" width="55%" />
        <gc-shimmer height="0.75rem" width="38%" />
      </div>
      <gc-shimmer shape="pill" height="1.75rem" width="4rem" />
    </div>
  }
</gc-card>`;

  readonly articleCode = `<gc-card variant="elevated">
  <gc-shimmer gcCardMedia height="14rem" />
  <div gcCardHeader>
    <gc-shimmer shape="pill" height="1.25rem" width="5rem" />
    <gc-shimmer height="1.5rem" width="90%" />
  </div>
  <!-- body paragraphs... -->
  <div gcCardFooter>
    <gc-shimmer shape="circle" width="2rem" height="2rem" />
    <gc-shimmer shape="pill" height="2rem" width="6rem" />
  </div>
</gc-card>`;
}
