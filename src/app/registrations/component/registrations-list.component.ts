import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-registrations-list',
  templateUrl: './registrations-list.component.html'
})
export class RegistrationsListComponent implements OnInit {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('ru');
    translate.use('ru');
  }

  ngOnInit(): void {

  }

}
