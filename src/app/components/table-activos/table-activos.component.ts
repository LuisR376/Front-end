import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Activos } from '../model/activos.model'
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../service/CustomerService';
import { authGuardService } from '../../service/auth-guard.service';
import { AlertaComponent } from '../../util/alerta.component';
import { RespuestaDto } from '../model/respuestaDto';

import { FormBuilder, Validators } from '@angular/forms';
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
    private customerService: CustomerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public _authGuardService: authGuardService,
    private fb: FormBuilder
  ) {
    this.token = this._authGuardService.getToken();
  }



  ngOnInit() {
    this.obtenerActivos();
    this.estado = [
      { label: 'INSTOCK', value: '1' },
      { label: 'LOWSTOCK', value: '0' },
      { label: 'OUTOFSTOCK', value: '0' }
    ];
  } 

  recoInfo = this.fb.group({
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
    idtipoactivo:[''],
    host_teamviewer:[''],
    password_teamviewer:[''],
    calculoEstimado:[''],
    Pertenencia:['']
    
  });
  obtenerActivos() {
    console.log("Token", this.token);
    this.customerService.getActivos(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Obtener Activos", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.activos = resp.addenda;
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.activos = this.activos.filter(val => val.id !== this.product.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    this.product = {};
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {

  }


  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  guardar(){
    console.log(this.recoInfo.value);
    
  }
}
