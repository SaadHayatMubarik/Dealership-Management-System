import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AvatarComponent {
  @Input() label = '';

  @Input() icon = '';

  @Input() size = '';

  @Input() iconClass = '';

  @Input() shape = '';

  @Input() image = '';

  @Input() primary = false;

  @Input() disabled = false;
}
