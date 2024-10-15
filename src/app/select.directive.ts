import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
@Directive({
  standalone: true,
  selector: '[select]',
})
export class SelectDirective {
  constructor(
    private templateRef: TemplateRef<HTMLElement>,
    private viewContainerRef: ViewContainerRef
  ) {}
}
