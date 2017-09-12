import {Directive, Input, ElementRef, Renderer} from '@angular/core';
import {FieldMessagesService} from '../../core/messages/field-messages.service';
import {Message} from '../../core/messages/message';

@Directive({
  selector: '[appFieldHasError]'
})
export class FieldHasErrorDirective {

  @Input() appFieldHasError: string;

  constructor(
    private elementRef: ElementRef,
    private fieldMessagesService: FieldMessagesService,
    private renderer: Renderer) {
    this.fieldMessagesService.subscribe((issues: Map<string, Message[]>) => {
      this.renderer.setElementClass(elementRef.nativeElement, 'has-error', issues && issues.has(this.appFieldHasError));
      console.log(this.elementRef);
    });
  }
}
