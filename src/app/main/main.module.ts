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
import { SelectComponent } from '../components/select/select.component';

import { SolicitudComponent } from '../components/solicitud/solicitud.component';
import { PerfilComponent } from '../components/perfil/perfil.component';
import { DetallePcComponent } from '../components/detalle-pc/detalle-pc.component';
import { ReasignacionByidComponent } from '../components/reasignacion-byid/reasignacion-byid.component';
import { LicenciaComponent } from '../components/licencia/licencia.component';


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
    SelectComponent,
    SolicitudComponent,
    PerfilComponent,
    DetallePcComponent,
    ReasignacionByidComponent,
    LicenciaComponent
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class MainModule { }
