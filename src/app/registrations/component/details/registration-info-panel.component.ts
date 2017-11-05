import {RegistrationDetails} from '../../models/registration-details';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-registration-info-panel',
  templateUrl: './registration-info-panel.component.html'
})
export class RegistrationInfoPanelComponent {

  @Input() registration: RegistrationDetails;

}
