import {Directive, Input, ElementRef, Renderer} from '@angular/core';
import {FieldMessagesService} from '../../core/messages/field-messages.service';
import {Message, MessageType} from '../../core/messages/message';

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
      let errors = 0;
      let warnings = 0;
      const fieldIssues = issues && issues.get(this.appFieldHasError);
      if (fieldIssues) {
        fieldIssues.forEach(issue => {
          if (MessageType.ERROR === issue.msgType) {
            errors++;
          }
          if (MessageType.WARNING === issue.msgType) {
            warnings++;
          }
        });
      }
      this.renderer.setElementClass(elementRef.nativeElement, 'has-error', errors !== 0);
      this.renderer.setElementClass(elementRef.nativeElement, 'has-warning', errors === 0 && warnings !== 0);
    });
  }
}
