import { Component,OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import { MessageService } from "primeng/api";
import { authGuardService } from "src/app/service/auth-guard.service";
import { CustomerService } from '../../service/CustomerService';
import {Activos} from '../model/activos.model'
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-nuevo-activo',
  templateUrl: './nuevo-activo.component.html',
  styleUrls: ['./nuevo-activo.component.css']
})
export class NuevoActivoComponent implements OnInit{
  constructor(
     private messageService: MessageService,
     public _authGuardService: authGuardService,
     public ticketService: CustomerService,
     private fb: FormBuilder
     ) {
        
     }
     activoInformacion!: MenuItem[];
     tablaActivos !: Activos;
  
  ngOnInit() {
      this.activoInformacion =  [{
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
recoInfo: FormGroup = this.fb.group({
    id:[''], 
    idactivos:[''],
    idlugar:[''],
    idarea:[''],
    nombre_propietario:[''],
    nombre_equipo:[''],
    num_empleado:[''],
    password:[''],
    fecha_mantenimien:[''],
    valor_monetario:[''],
    estado:[''],
    descripcion:[''],
    tipo_de_conexion:[''],
    iddetallepc:[''],
    idLicencias:[''],
    idtipoactivo:['2'],
    host_teamviewer:[''],
    password_teamviewer:[''],
    calculoEstimado:[''],
    Pertenencia:['']
    
  });
}
