import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-benefits-tab',
  templateUrl: './benefits-tab.component.html'
})
export class BenefitsTabComponent {

  @Input() prerogatives: string[];
  @Input() outOfCompetitions: string[];

  averageMark: number;

}
