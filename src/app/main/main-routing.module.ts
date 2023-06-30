import { NgModule }                    from '@angular/core';
import { RouterModule, Routes }        from '@angular/router';
import { LugarAreaComponent }          from '../components/lugar-area/lugar-area.component';
import { ReasignacionComponent }       from '../components/reasignacion/reasignacion.component';
import { SolicitudesComponent }        from '../components/solicitudes/solicitudes.component';
import { TableActivosComponent }       from '../components/table-activos/table-activos.component';
import { TableTicketComponent }        from '../components/table-ticket/table-ticket.component';
import { TableUsuarioComponent }       from '../components/table-usuario/table-usuario.component';
import { InicioComponent }             from '../components/inicio/inicio.component';
import { NuevoActivoComponent }        from '../components/nuevo-activo/nuevo-activo.component';

import { SolicitudComponent }          from '../components/solicitud/solicitud.component';
import { PerfilComponent}              from '../components/perfil/perfil.component';
import { DetallePcComponent }          from '../components/detalle-pc/detalle-pc.component';
import { LicenciaComponent }           from '../components/licencia/licencia.component';
import { ReasignacionByidComponent } from '../components/reasignacion-byid/reasignacion-byid.component';
import { NuevalicenciaComponent } from '../components/nuevalicencia/nuevalicencia.component';
import { CompServicioComponent } from '../components/comp-servicio/comp-servicio.component';
import { InventarioComponent } from '../components/inventario/inventario.component';
import { InventarioRASComponent } from '../components/inventario-ras/inventario-ras.component';
import { ContraLoginComponent } from '../components/contra-login/contra-login.component';


const routes: Routes = [
  {
      path: 'main', component: InicioComponent,
      children: [
      { path: 'Tusuario',           component: TableUsuarioComponent  },
      { path: 'Ticket',             component: TableTicketComponent   },
      { path: 'Tactivos',           component: TableActivosComponent  },
      { path: 'lugarArea',          component: LugarAreaComponent     },
      { path: 'reasignacion',       component: ReasignacionComponent  },
      { path: 'NuevoActivo',        component: NuevoActivoComponent   },
      
      { path: 'solicitudes',        component: SolicitudesComponent   },
      { path: 'solicitud/:id',      component: SolicitudComponent     },
      { path: 'perfil',             component: PerfilComponent        },
      { path: 'detallePc',          component: DetallePcComponent     },
      { path: 'licencia',           component: LicenciaComponent      },
      { path: 'ReasignacionByid/:id', component: ReasignacionByidComponent },
      { path: 'NewLicencia',        component: NuevalicenciaComponent },
      { path: 'servicio/:idfolio/:descFolio/:idlugar',           component: CompServicioComponent  },
      { path: 'inventario',                       component: InventarioComponent  },
      { path: 'inventarioRas/:idactivos',         component: InventarioRASComponent  },
      { path: 'recuperarContraseña',              component: ContraLoginComponent  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
