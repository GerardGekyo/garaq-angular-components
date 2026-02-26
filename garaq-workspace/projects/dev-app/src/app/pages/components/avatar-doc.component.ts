import { Component } from '@angular/core';
import { AvatarComponent, BadgeComponent } from 'garaq-angular-components';
import { ExampleSectionComponent } from '../../shared/example-section/example-section.component';

@Component({
  selector: 'doc-avatar',
  imports: [AvatarComponent, BadgeComponent, ExampleSectionComponent],
  templateUrl: './avatar-doc.component.html',
  styleUrl: './avatar-doc.component.css',
})
export class AvatarDocComponent {
  readonly sizesCode = `<gc-avatar size="xs" name="Ana García" />
<gc-avatar size="sm" name="Ana García" />
<gc-avatar size="default" name="Ana García" />
<gc-avatar size="lg" name="Ana García" />
<gc-avatar size="xl" name="Ana García" />`;

  readonly imageCode = `<gc-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1" name="Carlos" />
<gc-avatar src="https://i.pravatar.cc/150?img=5" name="María" size="lg" />
<!-- Fallback to initials on broken image -->
<gc-avatar src="https://invalid-url.test/404.jpg" name="Fallback Test" />`;

  readonly initialsCode = `<gc-avatar name="Juan Pérez" />  <!-- JP -->
<gc-avatar name="María" />       <!-- M -->
<gc-avatar name="" />             <!-- ? -->`;

  readonly colorsCode = `<gc-avatar name="Azul" background="#2563eb" color="#ffffff" />
<gc-avatar name="Verde" background="#16a34a" color="#ffffff" />
<gc-avatar name="Violeta" background="#7c3aed" color="#ffffff" />`;

  readonly contextCode = `<div class="flex items-center gap-3">
  <gc-avatar src="..." name="Laura Díaz" size="sm" />
  <div>
    <p class="text-sm font-medium">Laura Díaz</p>
    <p class="text-xs text-gray-500">laura&#64;ejemplo.com</p>
  </div>
</div>`;
}
