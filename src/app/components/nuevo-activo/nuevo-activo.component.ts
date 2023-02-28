import { Component,OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import { MessageService } from "primeng/api";
import { authGuardService } from "src/app/service/auth-guard.service";
import { CustomerService } from '../../service/CustomerService';
import {Activos} from '../model/activos.model'
@Component({
  selector: 'app-nuevo-activo',
  templateUrl: './nuevo-activo.component.html',
  styleUrls: ['./nuevo-activo.component.css']
})
export class NuevoActivoComponent implements OnInit{
  constructor(
     private messageService: MessageService,
     public _authGuardService: authGuardService,
     public ticketService: CustomerService
     ) {}
  items!: MenuItem[];
  tablaActivos !: Activos;
  ngOnInit() {
      this.items = [{
              label: 'Tipo de Activo',
              routerLink: 'Paso1'
          },
          {
              label: 'Datos del cliente',
              routerLink: 'seat'
          },
          {
              label: 'Ubicacion',
              routerLink: 'payment'
          },
          {
              label: 'Datos del Equipo',
              routerLink: 'confirmation'
          },
          {
            label: 'Accesorio',
            routerLink: ''
        }
      ];
      /*
      this.tablaActivos = this.ticketService.paymentComplete$.subscribe((personalInformation) =>{
        this.messageService.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.'});
    });
}

ngOnDestroy() {
    if (this.tablaActivos) {
        this.tablaActivos.unsubscribe();
    }
    */
}
}
