import {LoadingImageComponent} from './components/loading-image.component';
import {FieldHasErrorDirective} from './components/field-has-error.directive';
import {ConfirmationDialogComponent} from './dialogs/confirmation-dialog.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NKDatetimeModule} from 'ng2-datetime/ng2-datetime';
import {HasRolesDirective} from './security/has-roles.directive';
import {TranslateModule} from '@ngx-translate/core';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';

declare const $: any;
declare const JQuery: any;

@NgModule({
  imports: [
    CommonModule,
    MultiselectDropdownModule,
    NKDatetimeModule,
    TranslateModule.forChild()
  ],
  declarations: [
    ConfirmationDialogComponent,
    FieldHasErrorDirective,
    HasRolesDirective,
    LoadingImageComponent
  ],
  exports: [
    CommonModule,
    ConfirmationDialogComponent,
    FieldHasErrorDirective,
    HasRolesDirective,
    LoadingImageComponent,
    MultiselectDropdownModule,
    NKDatetimeModule,
    TranslateModule
  ],
  providers: []
})
export class SharedModule {

}
