import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LugarAreaComponent } from '../components/lugar-area/lugar-area.component';
import { ReasignacionComponent } from '../components/reasignacion/reasignacion.component';
import { SolicitudesComponent } from '../components/solicitudes/solicitudes.component';
import { TableActivosComponent } from '../components/table-activos/table-activos.component';
import { TableTicketComponent } from '../components/table-ticket/table-ticket.component';
import { TableUsuarioComponent } from '../components/table-usuario/table-usuario.component';
import { InicioComponent } from '../components/inicio/inicio.component';

const routes: Routes = [
  {
      path: 'main', component: InicioComponent,
      children: [
      { path: 'Tusuario', component: TableUsuarioComponent },
      { path: 'Ticket', component: TableTicketComponent },
      { path: 'Tactivos', component: TableActivosComponent },
      { path: 'solicitudes', component: SolicitudesComponent },
      { path: 'lugarArea', component: LugarAreaComponent },
      { path: 'reasignacion', component: ReasignacionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
