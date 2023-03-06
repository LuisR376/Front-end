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
import { NuevoActivoComponent } from '../components/nuevo-activo/nuevo-activo.component';
import { Paso1ActivoComponent } from '../paso1-activo/paso1-activo.component';
import { NuevoUsuarioComponent } from '../components/nuevo-usuario/nuevo-usuario.component';
import { UsuarioComponent } from '../components/usuario/usuario.component';
import { SelectComponent } from '../components/select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    TableTicketComponent,
    TableUsuarioComponent,
    TableActivosComponent,
    SolicitudesComponent,
    LugarAreaComponent,
    ReasignacionComponent,
    NuevoActivoComponent,
    Paso1ActivoComponent,
    NuevoUsuarioComponent,
    UsuarioComponent,
    SelectComponent
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class MainModule { }
