import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NKDatetimeModule} from 'ng2-datetime/ng2-datetime';
import {HasRolesDirective} from './security/has-roles.directive';
import {TranslateModule} from '@ngx-translate/core';

declare const $: any;
declare const JQuery: any;

@NgModule({
  imports: [
    CommonModule,
    NKDatetimeModule,
    TranslateModule.forChild()
  ],
  declarations: [
    HasRolesDirective
  ],
  exports: [
    CommonModule,
    HasRolesDirective,
    NKDatetimeModule,
    TranslateModule
  ],
  providers: []
})
export class SharedModule {

}
