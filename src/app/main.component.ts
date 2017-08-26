import {Component, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    console.log('Init main component');
  }
}

