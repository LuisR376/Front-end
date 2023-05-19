import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Activos } from '../model/activos.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../service/CustomerService';
import { authGuardService } from '../../service/auth-guard.service';
import { AlertaComponent } from '../../util/alerta.component';
import { RespuestaDto } from '../model/respuestaDto';

import { FormBuilder, Validators } from '@angular/forms';
import { ActivosService } from 'src/app/service/Activos.service';
import * as Papa from 'papaparse';
@Component({
  selector: 'app-table-activos',
  templateUrl: './table-activos.component.html',
  styleUrls: ['./table-activos.component.css'],
  providers: [MessageService, ConfirmationService]
})

export class TableActivosComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  
  productDialog !: boolean;
  activos: Activos[] = [];
  product: Activos = {};
  selectedProducts: Activos[] = [];
  submitted !: boolean;
  estado !: any[];
  token: string;
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  nuevoActivo: boolean = false;


  constructor(
    private _ActivosService: ActivosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public _authGuardService: authGuardService,
    private fb: FormBuilder
  ) {
    this.token = this._authGuardService.getToken();
  }



  ngOnInit() {
    this.obtenerActivos();
  } 
//POR SI EDITAR Y ELIMINAR
  recoInfo = this.fb.group({
    id                      :[''], 
    idactivos               :[''],
    idlugar                 :[''],
    idarea                  :[''],
    nombre_propietario      :[''],
    nombre_equipo           :[''],
    num_empleado            :[''],
    password                :[''],
    fecha_mantenimien       :[''],
    valor_monetario         :[''],
    estado                  :[''],
    descripcion             :[''],
    tipo_de_conexion        :[''],
    iddetallepc             :[''],
    idLicencias             :[''],
    idtipoactivo            :[''],
    host_teamviewer         :[''],
    password_teamviewer     :[''],
    calculoEstimado         :[''],
    Pertenencia             :['']
    
  });
  obtenerActivos() {
  console.log("Token", this.token);

  this._ActivosService.getActivos(this.token).subscribe({
    next: (resp) => {
      console.log("Obtener Activos", resp);
      let respuestaDto = <RespuestaDto>resp;
      if (respuestaDto.ok) {
        this.activos = resp.addenda.map((objetoactivo: any) => {
          objetoactivo.estado = objetoactivo.estado === 1 ? "Activo" : "Inactivo";
          return objetoactivo;
        });
      }
    },
    error: (error) => {
      let mensaje = <any>error;
      this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
    }
  });
}


  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

   exportCSV() {
    const csv = Papa.unparse(this.activos);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'Activos.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
   }
}
