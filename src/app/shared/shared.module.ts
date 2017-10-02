import {LoadingImageComponent} from './components/loading-image.component';
import {FieldHasErrorDirective} from './components/field-has-error.directive';
import {ConfirmationDialogComponent} from './dialogs/confirmation-dialog.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NKDatetimeModule} from 'ng2-datetime/ng2-datetime';
import {HasRolesDirective} from './security/has-roles.directive';
import {TranslateModule} from '@ngx-translate/core';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {TextMaskModule} from 'angular2-text-mask';
import {Ng2AutoCompleteModule} from 'ng2-auto-complete';

@NgModule({
  imports: [
    CommonModule,
    MultiselectDropdownModule,
    NKDatetimeModule,
    Ng2AutoCompleteModule,
    TextMaskModule,
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
    Ng2AutoCompleteModule,
    TextMaskModule,
    TranslateModule
  ],
  providers: []
})
export class SharedModule {

}
