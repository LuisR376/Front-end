import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from "primeng/api";
import { authGuardService } from "src/app/service/auth-guard.service";
import { CustomerService } from '../../service/CustomerService';
import { Activos } from '../model/activos.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tipoactivo } from '../model/tipoactivo.model';
import { RespuestaDto } from '../model/respuestaDto';
import { AlertaComponent } from 'src/app/util/alerta.component';
import { tipodeActivoService } from 'src/app/service/tipodeActivo.service';
import { insertTipodeActivo } from '../model/insertTipodeActivo';
import { detallePc } from '../model/detallePc.model';
import { ActivosService } from 'src/app/service/Activos.service';
import { insertActivo } from '../model/insertActivo';
import { insertDetallepc } from '../model/insertDetallepc';

@Component({
  selector: 'app-nuevo-activo',
  templateUrl: './nuevo-activo.component.html',
  styleUrls: ['./nuevo-activo.component.css']
})
export class NuevoActivoComponent implements OnInit {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  constructor(
    private messageService: MessageService,
    public _authGuardService: authGuardService,
    public ticketService: CustomerService,
    private customerService: CustomerService,
    private fb: FormBuilder,
    private _tipodeActivoService :tipodeActivoService,
    private _activosService:ActivosService
  ) {
    this.token = this._authGuardService.getToken();
  }
  token: string;
  displayAddModal: boolean = false;
  desactivarboton:boolean = true;
  activoInformacion!: MenuItem[];
  tablaActivos !: Activos;
  tipo_activo_desc !: tipodeActivoService[];
  Pertenencia!: any[];
  idtipoactivoSeleccionado!: number;
  iddetallepcSeleccionado!:number;
  iddetallepc!:insertDetallepc[];
  isDisabled: boolean = false;
  activosSave: any;
  opciones = [  { label: 'Empresa', value: 'Empresa' },
              { label: 'Personal', value: 'Personal' }];
  items = [
    { label: 'Tipo de Activo'           },
    { label: 'Datos del cliente'        },
    { label: 'Ubicacion'                },
    { label: 'Datos del Activo'         },
    { label: 'Licencias y Mantenimiento'}
  ];
  activeIndex = 0;
  step1Form!: FormGroup;
  step2Form!: FormGroup;
  step3Form!: FormGroup;
  step4Form!: FormGroup;
  step5Form!: FormGroup;


  ngOnInit() {
    this.obtenertipodeActivo();
    this.obtenerLugar();
    this.obtenerDetallepc();
    
    this.step1Form = this.fb.group({
           idtipoactivo : ['', [Validators.required]],
           Pertenencia  : ['', [Validators.required]],
           iddetallepc  : ['']
    });

    this.step2Form = this.fb.group({
      nombre_propietario: ['', [Validators.required]],
            num_empleado: ['', [Validators.required]],
                password: ['', [Validators.required]]
    });

    this.step3Form = this.fb.group({
      idlugar: ['', [Validators.required]],
       idarea: ['', [Validators.required]]
    });

    this.step4Form = this.fb.group({
      num_inventario        : ['', [Validators.required]],
      fecha_compra          : ['', [Validators.required]],
      valor_monetario       : ['', [Validators.required]],
      nombre_equipo         : ['', [Validators.required]],
      estado                : ['', [Validators.required]],
      descripcion           : ['', [Validators.required]],
      marca                 : ['', [Validators.required]],
      modelo                : ['', [Validators.required]],
      tipo_de_conexion      : ['', [Validators.required]],
    });

    this.step5Form = this.fb.group({

      idLicencias           : ['', [Validators.required]],
      host_teamviewer       : ['', [Validators.required]],
      password_teamviewer   : ['', [Validators.required]],
      fecha_mantenimiento   : ['', [Validators.required]],
      calculoEstimado       : ['', [Validators.required]],

      accesorio             : ['', [Validators.required]]
    });
  }
  onActiveIndexChange(event: any) {
    console.log('Nuevo índice activo:', event.index);
  }
  obtenerLugar() {
    console.log("Token", this.token);
    this.customerService.getLugar(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("obtenerLugar", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
        } 
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  obtenertipodeActivo() {
    console.log("Token", this.token);
    this._tipodeActivoService.gettipoActivo(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("TipoActivo", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.tipo_activo_desc = resp.addenda;
        } 
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  onChangeTipoActivo() {
    const idtipoactivo = this.step1Form.get('idtipoactivo')?.value;
    this.idtipoactivoSeleccionado = idtipoactivo === 1 ? idtipoactivo : null;
    if (idtipoactivo === 1 ){
      this.desactivarboton = true
    } else{
      this.desactivarboton = false
    }
  }
  onChangeDetallePc(){
    const iddetallepc = this.step1Form.get('iddetallepc')?.value;
    this.desactivarboton = iddetallepc == null || iddetallepc == undefined ? true : false;
  }
  
  obtenerDetallepc() {
    console.log("Token", this.token);
    this.customerService.getDetallePc(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("getDetallePc", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.iddetallepc = resp.addenda;
        } 
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
   addActivo() {
    console.log("Formulario", this.step1Form.value)
    if (this.step1Form.invalid) {
      this.messageService.add({ severity: 'error', summary: 'No es posible agregar', detail: 'Porfavor verifique todos los campos' });
    } else {
      console.log("idtipoactivo:", this.step1Form.value.iddetallepc)
      this.saveActivo(this.step1Form.value);
    } 
  }
  saveActivo(step1Form : Activos) {
    this._activosService.saveActivo(this.step1Form.value).subscribe(
      respuesta => {
        console.log('Activo guardado:', respuesta);
      },
      error => {
        console.error('Error al guardar activo:', error);
      }
    );
  }
  Cancelar() {
    this.step1Form.reset();

  }
 
  openNew() {
    this.displayAddModal = true;

  }
  closeModal() {
    this.displayAddModal = false;
  }
 onButtonClick() {
  if (!this.desactivarboton) {
    this.activeIndex = 1;
    this.addActivo();
  }
}
}
