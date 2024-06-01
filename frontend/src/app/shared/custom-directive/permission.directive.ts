import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective {
  @Input('appPermission') permission: string = '';

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    console.log('Directive initialized with permission:', this.permission);
    this.updateView();
    
  }

  private updateView(): void {
    if (this.authService.hasPermission(this.permission)) {
      console.log('Permission granted for:', this.permission); // Add this line
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      console.log('Permission denied for:', this.permission); // Add this line
      this.viewContainer.clear();
    }
  }

}
