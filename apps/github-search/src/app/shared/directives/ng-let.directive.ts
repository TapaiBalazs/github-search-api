import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

/*************************************************************************
 * Source: https://gist.github.com/d3lm/331373e0a5c7ff4fef61ecb8878d1eee *
 *                                                                       *
 *************************************************************************/

export class NgLetContext {
  $implicit: any = null;
  ngLet: any = null;
}

@Directive({
  selector: '[ngLet]'
})
export class NgLetDirective implements OnInit {
  private _context = new NgLetContext();

  @Input()
  set ngLet(value: any) {
    this._context.$implicit = this._context.ngLet = value;
  }

  constructor(private _vcr: ViewContainerRef, private _templateRef: TemplateRef<NgLetContext>) {}

  ngOnInit() {
    this._vcr.createEmbeddedView(this._templateRef, this._context);
  }
}
