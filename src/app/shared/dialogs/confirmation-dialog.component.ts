import {Component, Input, OnInit, EventEmitter, Output, SimpleChanges, SimpleChange} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styles: ['.modal-dialog { width: 400px; }']
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() dialogId: string;
  @Input() header: string;
  @Input() headerKey = 'common.confirmation-header';
  @Input() message: string;
  @Input() messageKey: string;
  private _messageParams: Object;
  @Input() confirm: string;
  @Input() confirmKey = 'common.confirm';
  @Input() cancel: string;
  @Input() cancelKey = 'common.cancel';

  @Output() onConfirm: EventEmitter<any> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();

  @Input()
  set messageParams(messageParams: Object) {
    this._messageParams = messageParams;
    this.translate.get(this.messageKey, this._messageParams).subscribe(result => {
      this.message = result;
    });
  }

  onConfirmAction(): void {
    this.onConfirm.emit();
  }

  onCancelAction(): void {
    this.onCancel.emit();
  }

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    if (this.headerKey) {
      this.translate.get(this.headerKey).subscribe(result => this.header = result);
    }
    if (this.messageKey) {
      this.translate.get(this.messageKey, this.messageParams).subscribe(result => this.message = result);
    }
    if (this.cancelKey) {
      this.translate.get(this.cancelKey).subscribe(result => this.cancel = result);
    }
    if (this.confirmKey) {
      this.translate.get(this.confirmKey).subscribe(result => this.confirm = result);
    }
  }

}
