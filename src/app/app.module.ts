
import { AppRoutingModule } from './app-routing.module';
import {AvatarModule} from 'primeng/avatar';
import { SharedModule } from './shared.module';
import { LoginComponent } from './components/login/login.component';
import { InputTextModule } from 'primeng/inputtext';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioService } from './service/usuario.service';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {FileUploadModule} from 'primeng/fileupload';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';

import { InputTextareaModule } from 'primeng/inputtextarea';

import { RippleModule } from 'primeng/ripple';
import { SlideMenuModule } from 'primeng/slidemenu';
import {ToolbarModule} from 'primeng/toolbar';
import {SplitButtonModule} from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import {TableModule} from 'primeng/table';
import { CustomerService } from './service/CustomerService';
import { AreaService } from './service/Area.service';
import { PrincipalComponent } from './components/indexPrincipal/principal.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [

    LoginComponent,
    PrincipalComponent,
    
   
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    SidebarModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    MenuModule,
    RippleModule,
    SlideMenuModule,
    ToolbarModule,
    AvatarModule,
    SplitButtonModule,
    ToastModule,
    TableModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    DropdownModule,
    ProgressBarModule,
    FileUploadModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    InputTextareaModule

  ],
  providers: [
    UsuarioService,
    CustomerService,
    AreaService
  ],
  bootstrap: [PrincipalComponent],
  exports: [FormsModule,
    ReactiveFormsModule]
    
})
export class AppModule {
}
