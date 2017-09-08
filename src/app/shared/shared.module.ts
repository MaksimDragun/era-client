import {LoadingImageComponent} from './components/loading-image.component';
import {ConfirmationDialogComponent} from './dialogs/confirmation-dialog.component';
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
    ConfirmationDialogComponent,
    HasRolesDirective,
    LoadingImageComponent
  ],
  exports: [
    CommonModule,
    ConfirmationDialogComponent,
    HasRolesDirective,
    LoadingImageComponent,
    NKDatetimeModule,
    TranslateModule
  ],
  providers: []
})
export class SharedModule {

}
