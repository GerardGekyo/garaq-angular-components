import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent, BadgeComponent } from 'garaq-angular-components';
import { CATEGORIES, getComponentsByCategory, EXAMPLE_REGISTRY } from '../../shared/component-info';

@Component({
  selector: 'doc-home',
  imports: [RouterLink, CardComponent, BadgeComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  protected readonly categories = CATEGORIES;
  protected readonly getComponentsByCategory = getComponentsByCategory;
  protected readonly examples = EXAMPLE_REGISTRY;
}
