import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { SeparatorComponent, ToastContainerComponent } from 'garaq-angular-components';
import { CATEGORIES, getComponentsByCategory, EXAMPLE_REGISTRY } from './shared/component-info';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, SeparatorComponent, ToastContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly categories = CATEGORIES;
  protected readonly getComponentsByCategory = getComponentsByCategory;
  protected readonly examples = EXAMPLE_REGISTRY;
  protected readonly sidebarOpen = signal(false);

  protected toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  protected closeSidebar(): void {
    this.sidebarOpen.set(false);
  }
}
