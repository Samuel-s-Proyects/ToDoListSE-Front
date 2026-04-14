import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input({ required: true }) icon!: IconDefinition;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
}
