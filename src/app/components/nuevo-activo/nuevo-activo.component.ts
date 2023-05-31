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

import { detallePc } from '../model/detallePc.model';
import { ActivosService } from 'src/app/service/Activos.service';
import { insertActivo } from '../model/insertActivo';
import { insertDetallepc } from '../model/insertDetallepc';
import { log } from 'console';
import { Lugar } from '../model/lugar.model';
import { lugarAreas } from '../model/lugarArea.model';
import { licenciaService } from 'src/app/service/licencia.service';
import { licencia } from '../model/licencia.model';
import { accesorioService } from 'src/app/service/accesorio.service';
import { ValidatorsService } from 'src/app/service/validators.service';

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
    private _tipodeActivoService: tipodeActivoService,
    private _activosService: ActivosService,
    private _licenciaService: licenciaService,
    private _accesorioService: accesorioService,
    private validatorService:ValidatorsService
  ) {
    this.token = this._authGuardService.getToken();
  }
  token: string;
  displayAddModal: boolean = false;
  desactivarboton: boolean = true;
  activoInformacion!: MenuItem[];
  tablaActivos !: Activos;
  tipo_activo_desc !: tipodeActivoService[];
  Pertenencia!: any[];
  lugares!: Lugar[];
  area !: lugarAreas[];
  idtipoactivoSeleccionado!: number;
  iddetallepcSeleccionado!: number;
  iddetallepc!: insertDetallepc[];
  isDisabled: boolean = false;

  activosSave: any;
  active!: Activos;
  idactivo!: number;
  licencias   !: licencia[];
  
  opcionesEstado = [{ label: 'Activo', value: 1 }, { label: 'Inactivo', value: 0 }];
  opciones = [{ label: 'Empresa', value: 'Empresa' },{ label: 'Personal', value: 'Personal' }];
  items = [
    { label: 'Tipo de Activo' },
    { label: 'Datos del cliente' },
    { label: 'Ubicacion' },
    { label: 'Datos del Activo' },
    { label: 'Licencias y Mantenimiento' }
  ];
  activeIndex = 0;
  step1Form!: FormGroup;
  step2Form!: FormGroup;
  step3Form!: FormGroup;
  step4Form!: FormGroup;
  step5Form!: FormGroup;
  accesorioForm !: FormGroup;



  ngOnInit() {
    this.obtenertipodeActivo();
    this.obtenerLugar();
    this.obtenerArea();
    this.obtenerDetallepc();
    this.obtenerLicencias();
    this.initFormAccesorio();
    
    this.step1Form = this.fb.group({
      idtipoactivo: ['', [Validators.required]],
      Pertenencia: ['', [Validators.required]],
      iddetallepc: ['']
    });

    this.step2Form = this.fb.group({
      idactivo: [''],
      nombre_propietario: ['', [Validators.required,Validators.pattern( this.validatorService.firstNameAndLastnamePattern)]],
      num_empleado: ['', [Validators.required,Validators.maxLength(4), this.validatorService.validaSoloNumeros]],
      password: ['', [Validators.required, this.validatorService.validateNoQuery]]
    });

    this.step3Form = this.fb.group({
      idlugar: ['', [Validators.required]],
      idarea: ['', [Validators.required]]
    });

    this.step4Form = this.fb.group({
      num_inventario: ['', [Validators.required]],
      fecha_compra: ['', [Validators.required]],
      valor_monetario: ['', [Validators.required]],
      nombre_equipo: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      tipo_de_conexion: ['', [Validators.required]],
      
    });

    this.step5Form = this.fb.group({

      idLicencias: ['', [Validators.required]],
      host_teamviewer: ['', [Validators.required]],
      password_teamviewer: ['', [Validators.required]],
      fecha_mantenimiento: ['', [Validators.required]],
      calculoEstimado: ['', [Validators.required]],

    });
  }
  


  initFormAccesorio(){
    this.accesorioForm = this.fb.group({

      tipoaccesorio: ['', [Validators.required]],
      serie: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      status: ['', [Validators.required]],
      idactivos: [''],
    });
  }


  onActiveIndexChange(event: any) {
    console.log('Nuevo índice activo:', event.index);
  }
  obtenerLugar() {
    console.log("Token", this.token);
    this.customerService.getLugar(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Lugaaaaaaaaaaaaar", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.lugares = resp.addenda;
        } else {

        } // if
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  obtenerArea() {
    console.log("Token", this.token);
    this.customerService.getArea(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Obtener Area", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.area = resp.addenda;
        } else {

        } // if
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
  obtenerLicencias() {
    this._licenciaService.getLicencia(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Obtener Licencias", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.licencias = resp.addenda;
          var concatLabel = '';
          for(let key in this.licencias){
            var concatLabel = '';
                    concatLabel =  this.licencias[key].numserie_licencia+ '-' + this.licencias[key].nombre;
                    this.licencias[key].nombre = concatLabel;
          }
          console.log("this.licencias", this.licencias);

        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });

  }
  get opcionesLicencias() {
    if (this.licencias) {
      const licenciasList = this.licencias.map((licencia) => `${licencia.numserie_licencia} - ${licencia.nombre}`);
      return licenciasList;
    } else {
      return [];
    }
  }


  onChangeTipoActivo() {
    //Se obtiene el valor actual del campo "idtipoactivo" utilizando el método "get()" del formulario "step1Form". 
    const idtipoactivo = this.step1Form.get('idtipoactivo')?.value;
    this.idtipoactivoSeleccionado = idtipoactivo === 1 ? idtipoactivo : null;
    if (idtipoactivo === 1) {
      this.desactivarboton = true
    } else {
      this.desactivarboton = false
    }
  }
  onChangeDetallePc() {
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
  saveActivo(step1Form: Activos) {
    this._activosService.saveActivo(this.step1Form.value).subscribe(
      respuesta => {
        console.log('Activo guardado:', respuesta);
        this.idactivo = respuesta.addenda.idactivo;
        console.log(this.idactivo);
      },
      error => {
        console.error('Error al guardar activo:', error);
      }
    );
  }
  async updateDatosPersonales() {
    this.step2Form.value.idactivo = this.idactivo
    console.log("update:", this.step2Form.value);
    // Llamar a la función updateActivoDatosPersonales de ActivosService y pasarle el objeto de Activos actualizado
    this._activosService.updateActivoDatosPersonales(this.step2Form.value).subscribe({
      next: (resp: RespuestaDto) => {
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.valido == 0) {
          console.log("next", respuestaDto.mensaje)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
        } else {
          this.active = <Activos>respuestaDto.addenda;
          this.messageService.add({ severity: 'success', summary: 'Se ha actualizado correctamente', detail: respuestaDto.mensaje });
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  async updateUbicacion() {
    this.step3Form.value.idactivo = this.idactivo
    console.log("update:", this.step3Form.value);
    // Llamar a la función updateUbicacionActivos de ActivosService y pasarle el objeto de Activos actualizado
    this._activosService.updateUbicacionActivos(this.step3Form.value).subscribe({
      next: (resp: RespuestaDto) => {
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.valido == 0) {
          console.log("next", respuestaDto.mensaje)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
        } else {
          this.active = <Activos>respuestaDto.addenda;
          this.messageService.add({ severity: 'success', summary: 'Se ha actualizado correctamente', detail: respuestaDto.mensaje });
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }

  async updateDatosDelActivos() {
    this.step4Form.value.idactivo = this.idactivo
    console.log("update:", this.step4Form.value);
    // Llamar a la función updatedatosActivos de ActivosService y pasarle el objeto de Activos actualizado
    this._activosService.updatedatosActivos(this.step4Form.value).subscribe({
      next: (resp: RespuestaDto) => {
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.valido == 0) {
          console.log("next", respuestaDto.mensaje)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
        } else {
          this.active = <Activos>respuestaDto.addenda;
          this.messageService.add({ severity: 'success', summary: 'Se ha actualizado correctamente', detail: respuestaDto.mensaje });
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  async updateLicYmantdeActivos() {
    this.step5Form.value.idactivo = this.idactivo
    console.log("update:", this.step5Form.value);
    // Llamar a la función updateLicyMantActivos de ActivosService y pasarle el objeto de Activos actualizado
    this._activosService.updateLicyMantActivos(this.step5Form.value).subscribe({
      next: (resp: RespuestaDto) => {
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.valido == 0) {
          console.log("next", respuestaDto.mensaje)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
        } else {
          this.active = <Activos>respuestaDto.addenda;
          this.messageService.add({ severity: 'success', summary: 'Se ha actualizado correctamente', detail: respuestaDto.mensaje });
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  async insertAccesorio() {
    this.accesorioForm.value.idactivos = this.idactivo
    console.log("update:", this.accesorioForm.value);
    // Llamar a la función _accesorioService de _accesorioService y pasarle el objeto de accesorio actualizado
    this._accesorioService.saveAccesorio(this.accesorioForm.value).subscribe({
      next: (resp: RespuestaDto) => {
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.valido == 0) {
          console.log("next", respuestaDto.mensaje)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
        } else {
          this.active = <Activos>respuestaDto.addenda;
          this.messageService.add({ severity: 'success', summary: 'Se ha actualizado correctamente', detail: respuestaDto.mensaje });
        }
      },
      error: (error: any) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  Cancelar() {
    this.step1Form.reset();

  }

  openNew() {
    this.displayAddModal = true;

  }
  closeModal() {
    this.displayAddModal = false;
    this.accesorioForm.reset();
  }
  onButtonClick() {
    if (!this.desactivarboton) {
      this.activeIndex = 1;
      this.addActivo();
    }
  }
  onActualizarClick() {
    this.activeIndex = 2;
    this.updateDatosPersonales();
  }
  onActualizarUbiClick() {
    this.activeIndex = 3;
    this.updateUbicacion();
  }
  onActualizarActivosClick() {
    this.activeIndex = 4;
    this.updateDatosDelActivos();
  }
  onFinalizarActivosClick() {
    this.activeIndex = 5;
    this.updateLicYmantdeActivos();
  }


  addAccesorio(){

  }
}
