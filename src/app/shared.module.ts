
import { HttpClientModule } from "@angular/common/http";

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ToastModule } from 'primeng/toast';

import { MessageService, ConfirmationService } from "primeng/api";
import { AlertaComponent } from "./util/alerta.component";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { authGuardService } from "./service/auth-guard.service";
import { LocalService } from "./service/local.service";
import { UtilApiService } from "./service/util-api.service";
import { InicioComponent } from "./components/inicio/inicio.component";
import { ToolbarModule } from "primeng/toolbar";
import { ContextMenuModule } from "primeng/contextmenu";
import { DialogModule } from "primeng/dialog";
import { FileUploadModule } from "primeng/fileupload";
import { ProgressBarModule } from "primeng/progressbar";
import { RadioButtonModule } from "primeng/radiobutton";
import { RatingModule } from "primeng/rating";
import { MenuComponent } from "./components/menu/menu.component";
import { AvatarModule } from "primeng/avatar";
import { SplitButtonModule } from "primeng/splitbutton";
import { SidebarModule } from "primeng/sidebar";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MenuModule } from "primeng/menu";
import { RippleModule } from "primeng/ripple";
import { TableModule } from "primeng/table";
import { SlideMenuModule } from "primeng/slidemenu";
import {MenuItem} from 'primeng/api';
import {MegaMenuItem} from 'primeng/api';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import {StepsModule} from 'primeng/steps';
import { FolioService } from "./service/folio.service";
import { ticketService } from "./service/ticket.service";
import {tipodeservicioService} from "./service/tipodeservicio.service";
import { GalleriaModule } from 'primeng/galleria';
import { reasignacionService } from "./service/reasignacion.service";
import { tecnicoService } from "./service/tecnico.service";
import { licenciaService } from "./service/licencia.service";
@NgModule({
  declarations: [
    AlertaComponent,
    InicioComponent,
    MenuComponent
  ],
  imports: [
    RouterModule,
    ConfirmDialogModule,
    SidebarModule,
    SlideMenuModule,
    SplitButtonModule,
    AvatarModule,
    ToolbarModule,
    CommonModule,
    InputTextModule
  ],
  exports: [
    InicioComponent,
    MenuComponent,
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
    ConfirmDialogModule,
    ToolbarModule,

    ContextMenuModule,
    DialogModule,
    ProgressBarModule,
    FileUploadModule,
    RatingModule,
    RadioButtonModule,
    AvatarModule,
    SplitButtonModule,
    SidebarModule,
    SlideMenuModule,
    ReactiveFormsModule,
    MenuModule,
    RippleModule,
    TableModule,
    StepsModule,
    GalleriaModule
    



  ],
  providers: [MessageService, 
    ConfirmationService, 
    authGuardService,
     LocalService, UtilApiService, FolioService, ticketService,tipodeservicioService,reasignacionService,tecnicoService,licenciaService],
  bootstrap: []
})
export class SharedModule { }
