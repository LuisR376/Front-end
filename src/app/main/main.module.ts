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
import { PasoUnoPropiedadComponent } from '../components/pasos-activo/paso-uno-propiedad/paso-uno-propiedad.component';
import { PasoDosDetallePropComponent } from '../components/pasos-activo/paso-dos-detalle-prop/paso-dos-detalle-prop.component';
import { StepActivoModule } from '../step-activo/step-activo.module';


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
    

  ],exports : [
    TableActivosComponent
  ]
})
export class MainModule { }
