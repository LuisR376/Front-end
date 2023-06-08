
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
            icon: 'pi pi-file',
            routerLink: ['solicitudes']
         },
         {
            label: 'Tikets',
            icon: 'pi pi-inbox',
            routerLink: ['Ticket']
         },
         {
            label: 'ContraLoginComponent',
            icon: 'pi pi-inbox',
            routerLink: ['recuperarContraseña']
         }
      );
      if (this.sesionUsuario.clave === 'ADM') {
         this.items.push(
            {
               label: 'Reasignacion',
               icon: ' pi pi-sync',
               routerLink: ['reasignacion']
            },
         );
      }

      if (this.sesionUsuario.clave === 'ADM') {
         this.items.push(

            {
               label: 'Utilerías',
               icon: 'pi pi-cog',
               items:  [
                  {
                     label: 'Usuarios',
                     icon: 'pi pi-user',
                     routerLink: ['Tusuario']
                  },
                  {
                     label: 'Lugar y Area',
                     icon: 'pi pi-map-marker',
                     routerLink: ['lugarArea']
                  },
                  
                     ]
            },
             );

      }
      if (this.sesionUsuario.clave === 'TEC' || this.sesionUsuario.clave === 'ADM') {
         this.items.push(
            {
               label: 'Trazabilidad y Control',
               icon: 'pi pi-wrench',
               items: [
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
            
          
                  {
                     label: 'Inventario',
                     icon: 'pi pi-chart-pie',
                     routerLink: ['inventario']
                  },
               ]
            }
         );
               
      
      }
   }
}
