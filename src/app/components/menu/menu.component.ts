
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Usuario } from '../model/usuario.model';
import { authGuardService } from '../../service/auth-guard.service';

@Component({
   selector: 'app-menu',
   templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {

   visibleSidebar1: boolean = false;
   items: MenuItem[] = new Array();
   sesionUsuario !: Usuario;

   constructor(
      private primengConfig: PrimeNGConfig,
      public _authGuardService: authGuardService) {
      this.sesionUsuario = this._authGuardService.getUser();
   }
   ngOnInit() {
      this.obtenerMenu();
      console.log("this.sesionUsuario ", this.sesionUsuario);

   }

   obtenerMenu() {
      this.primengConfig.ripple = true;
      console.log("this.sesionUsuario.descripcion_rol ", this.sesionUsuario.clave);


      this.items.push(
         {
            label: 'Solicitudes',
            icon: 'pi pi-fw pi-file',
            routerLink: ['solicitudes']
         },
         {
            label: 'Tikets',
            icon: 'pi pi-inbox',
            routerLink: ['Ticket']
         }
      );
      if (this.sesionUsuario.clave === 'TEC' || this.sesionUsuario.clave === 'ADM') {
         this.items.push(

            {
               label: 'Reasignacion',
               icon: ' pi pi-sync',
               routerLink: ['reasignacion']
            },
            {
               label: 'Utilerías',
               icon: 'pi pi-file-import',
               items: [
                  {
                     label: 'Usuarios',
                     icon: 'pi pi-fw pi-user',
                     routerLink: ['Tusuario']
                  },
                  {
                     label: 'Lugar y Area',
                     icon: 'pi pi-map-marker',
                     routerLink: ['lugarArea']
                  },
                  {
                     label: 'Activos',
                     icon: 'pi pi-desktop',
                     routerLink: ['Tactivos']
                  },
                  {
                     label: 'Licencia',
                     icon: 'pi pi-microsoft',
                     routerLink: ['licencia']
                  },
               ]
            },
            {
               label: 'Inventario',
               icon: 'pi pi-chart-pie',
               routerLink: ['inventario']
            },
            {
               label: 'Reportes',
               icon: 'pi pi-chart-bar'
            },
            {
               label: 'Nuevo Activo ',
               icon: 'pi pi-chart-bar',
               routerLink: ['NuevoActivo']
            },
         )
      }
   }
}
