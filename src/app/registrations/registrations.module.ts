import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { RegistrationsRoutingModule } from './registrations-routing.module';

import { RegistrationsListComponent } from './component/registrations-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RegistrationsRoutingModule
    ],
    declarations: [
        RegistrationsListComponent
    ],
    exports: [
        RegistrationsListComponent
    ],
    providers: [

    ]
})
export class RegistrationsModule {}
