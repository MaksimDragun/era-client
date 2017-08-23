import { Component, OnInit } from '@angular/core';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

    constructor() {}

    ngOnInit() {
        console.log("Init home component");
    }
}