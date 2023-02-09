
import { HttpClientModule } from "@angular/common/http";

import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { AutoCompleteModule } from "primeng/autocomplete";
import {ToastModule} from 'primeng/toast';

import { MessageService, ConfirmationService } from "primeng/api";
import { AlertaComponent } from "./util/alerta.component";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { authGuardService } from "./service/auth-guard.service";
import { LocalService } from "./service/local.service";
import { UtilApiService } from "./service/util-api.service";
@NgModule({
  declarations: [
    AlertaComponent
  ],
  imports: [
    ConfirmDialogModule
  ],
  exports:[
    BrowserModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    AutoCompleteModule,
    FormsModule,
    HttpClientModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    ToastModule,
    AlertaComponent,
    ConfirmDialogModule
  ],
  providers: [ MessageService, ConfirmationService, authGuardService, LocalService, LocalService , UtilApiService],
  bootstrap: []
})
export class SharedModule { }
