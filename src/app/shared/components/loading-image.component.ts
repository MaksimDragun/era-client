import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading-image.component.html'
})
export class LoadingImageComponent {

  @Input() loading: boolean;
}
