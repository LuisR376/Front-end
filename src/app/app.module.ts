
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { LoginComponent } from './components/login/login.component';
import { InputTextModule } from 'primeng/inputtext';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioService } from './service/usuario.service';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { SlideMenuModule } from 'primeng/slidemenu';
import {ToolbarModule} from 'primeng/toolbar';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    MenuComponent
   
  ],
  imports: [
    BrowserModule,
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
    ToolbarModule
  ],
  providers: [UsuarioService ],
  bootstrap: [AppComponent],
  exports: [FormsModule,
    ReactiveFormsModule]
})
export class AppModule {
}
