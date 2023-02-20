import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { AppComponent } from '../app.component';
import { SharedModule } from '../shared.module';
import { TableTicketComponent } from '../components/table-ticket/table-ticket.component';
import { LugarAreaComponent } from '../components/lugar-area/lugar-area.component';
import { ReasignacionComponent } from '../components/reasignacion/reasignacion.component';
import { SolicitudesComponent } from '../components/solicitudes/solicitudes.component';
import { TableActivosComponent } from '../components/table-activos/table-activos.component';
import { TableUsuarioComponent } from '../components/table-usuario/table-usuario.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    TableTicketComponent,
    TableUsuarioComponent,
    TableActivosComponent,
    SolicitudesComponent,
    LugarAreaComponent,
    ReasignacionComponent
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class MainModule { }
