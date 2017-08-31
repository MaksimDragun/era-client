import {TitleService} from '../../core/services/title.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: module.id,
  templateUrl: './registrations-create.component.html'
})
export class RegistrationsCreateComponent implements OnInit {

  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitleKey('registrations.create.title');
  }

}
