import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import { Message, ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { Usuario } from '../model/usuario.model';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authGuardService } from '../../service/auth-guard.service';
import { RespuestaDto } from '../model/respuestaDto';
import { AlertaComponent } from 'src/app/util/alerta.component';
import { UsuarioService } from '../../service/usuario.service';
import { Vehiculo } from 'src/app/data/vehiculo';
import { Estados } from 'src/app/data/estados.data';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',

})
export class UsuarioComponent implements OnInit {
  @ViewChild('formDirective', { static: false }) private formDirective !: NgForm;
  @ViewChild('formDirectiveVehiculo', { static: false }) private formDirectiveVehiculo !: NgForm;
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  show: boolean = false;
  displayDialog !: boolean;
  cliente !: Usuario
  selectedCliente !: Usuario;
  nuevoCliente !: boolean;
  clientes !: Usuario[];
  validarForm: boolean = false;
  validarFormVehiculo: boolean = false;
  columnasCliente = [
    { field: 'client_nom', header: 'Nombre' },
    { field: 'client_ap', header: 'Apellido Paterno' },
    { field: 'client_am', header: 'Apellido Materno' },
    { field: 'client_tel', header: 'Telefono' },
    { field: 'client_no_vehiculo', header: '# Vehículos' },
    { field: 'client_cuenta_clave', header: 'Cuenta Clabe' },

  ];
  msgs: Message[] = [];
  estadosSelect: SelectItem[];
  estados: Estados[];
  cliente_idSelected: number;
  token: any;
  clientesForm: FormGroup;
  vehiculoForm: FormGroup;
  vehiculos: Vehiculo[];
  selectedVehiculo: Vehiculo;
  menuId: number = 4;
  accesoPermitido;
  permisos;
  constructor(
    private service: MessageService,
    private confirmationService: ConfirmationService,
    private _authGuardService: authGuardService,
    private fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _clientesService: UsuarioService,
    private router: Router
  ) {

    this.token = this._authGuardService.getToken();
    this.validadorFormClientes();
    this.validadorFormVehiculo();
  }


  showSuccessViaToast() {
    this.service.add({ key: 'agregar', severity: 'success', summary: 'Mensaje', detail: 'Los datos han sido guardados.' });
  }

  showInfoViaToast() {
    this.service.add({ key: 'eliminar', severity: 'info', summary: 'Mensaje', detail: 'Los datos han sido elimimnados' });
  }

  obtenerPermiso(permisosArr, menuId) {
    this.accesoPermitido = permisosArr.some(el => el.id_menu === menuId)
    return permisosArr;
  }


  async ngOnInit(): Promise<void> {
    this.permisos = this._authGuardService.getPermisos();
    const obtenerPermisos = await this.obtenerPermiso(this.permisos, this.menuId);

    if (!this.accesoPermitido) this.router.navigate(['/inicio']);
    const obtenClientes = await this.fnObtenerClientes();
    const obtenEstados = await this.fnObtenerEstados();
    if (obtenClientes && obtenClientes.ok) this.show = false;
  }

  showDialogToAdd() {
    this.nuevoCliente = true;
    this.validarForm = false;
    this.validarFormVehiculo = false;
    this.vehiculos = [];
    this.displayDialog = true;
    this.limpiarFom();
  }

  limpiarFom() {
    this.formDirective.resetForm();
  }


  limpiarFomVehiculo() {
    this.formDirectiveVehiculo.resetForm();
    this.validarFormVehiculo = false;
  }

  save() {

    this.displayDialog = false;
    let clientes = [...this.clientes];
    if (this.nuevoCliente) {
      clientes.push(this.clientesForm.value);
    } else {
      clientes[this.clientes.indexOf(this.selectedCliente)] = this.clientesForm.value;
    }
    this.clientes = clientes;
    this.showSuccessViaToast();
    this.limpiarFom();


  }



  delete() {
    let index = this.clientes.indexOf(this.selectedCliente);
    this.clientes = this.clientes.filter((val, i) => i != index);
    this.cliente = null;
    this.displayDialog = false;
  }

  async onRowSelect(event) {
    this.validarForm = false;
    this.validarFormVehiculo = false;
    this.nuevoCliente = false;
    this.cloneCliente(event.data);
    const obtenerVehiculoPorCliente = await this.fnObtenerVehiculoCliente(event.data);
    this.displayDialog = true;
  }

  cloneCliente(datos: Usuario) {
    this.cliente_idSelected = datos.client_id;
    this.clientesForm.setValue({
      client_id: this.cliente_idSelected,
      client_nom: datos.client_nom,
      client_ap: datos.client_ap,
      client_am: datos.client_am,
      client_correo: datos.client_correo,
      client_tel: datos.client_tel,
      client_calle: datos.client_calle,
      client_no_int: datos.client_no_int,
      client_no_ext: datos.client_no_ext,
      client_colonia: datos.client_colonia,
      client_ciudad: datos.client_ciudad,
      id_estado: datos.id_estado,
      client_cp: datos.client_cp,
      client_edificio: datos.client_edificio,
      client_rfc: datos.client_rfc,
      client_cuenta_clave: datos.client_cuenta_clave,
      client_estatus: datos.client_estatus
    });
  }

  validadorFormClientes() {
    this.clientesForm = this.fb.group({

      client_id: [''],
      client_nom: ['', [Validators.required]],
      client_ap: ['', [Validators.required]],
      client_am: ['', [Validators.required]],
      client_correo: ['', [Validators.required, Validators.email]],
      client_tel: ['', [Validators.required]],
      client_calle: ['', [Validators.required]],
      client_no_int: ['', [Validators.required]],
      client_no_ext: ['', [Validators.required]],
      client_colonia: ['', [Validators.required]],
      client_ciudad: ['', [Validators.required]],
      id_estado: ['', [Validators.required]],
      client_cp: ['', [Validators.required]],
      client_edificio: ['', [Validators.required]],
      client_rfc: ['', [Validators.required]],
      client_cuenta_clave: ['', [Validators.required]],
      client_estatus: [''],

    });
    //detecta los cambios de los validators
    this.clientesForm.valueChanges.subscribe(value => {
      this._cdr.detectChanges();
    });
  }



  validadorFormVehiculo() {
    this.vehiculoForm = this.fb.group({

      vehiculo_id: [''],
      vehiculo_marca: ['', [Validators.required]],
      vehiculo_modelo: ['', [Validators.required]],
      vehiculo_placa: ['', [Validators.required]],
      // vehiculo_qr : ['', [Validators.required]],
      vehiculo_estatus: [''],
      client_id: ['']

    });
    //detecta los cambios de los validators
    this.vehiculoForm.valueChanges.subscribe(value => {
      this._cdr.detectChanges();
    });
  }




  async fnObtenerClientes() {
    try {
      const obtenClientes = await this._clientesService.obtenerClientes(this.token).toPromise();
      let respuestaDto = <RespuestaDto>obtenClientes;
      if (obtenClientes.ok) {
        this.clientes = <Usuario[]>respuestaDto.addenda;
      } else {
        this.mensajeAlerta.alerta("AVISO", "", respuestaDto.mensaje, "");
      }
      return obtenClientes;
    } catch (error) {
      let mensaje = <any>error;
      if (mensaje && mensaje.status) {
        this.mensajeAlerta.alerta("ERROR", "", mensaje.status + mensaje.statusText, '');
      }
    }
  }




  async fnObtenerEstados() {
    try {
      this.estadosSelect = [];
      const obtenEstados = await this._clientesService.obtenerEstados(this.token).toPromise();
      let respuestaDto = <RespuestaDto>obtenEstados;
      if (obtenEstados.ok) {
        this.estados = <Estados[]>respuestaDto.addenda;

        for (let key in this.estados) {
          this.estadosSelect.push({ label: this.estados[key].edo_desc, value: this.estados[key].edo_id });
        }
        console.log("estadosSelect", this.estadosSelect)

      } else {
        this.mensajeAlerta.alerta("AVISO", "", respuestaDto.mensaje, "");
      }
      return obtenEstados;
    } catch (error) {
      let mensaje = <any>error;
      if (mensaje && mensaje.status) {
        this.mensajeAlerta.alerta("ERROR", "", mensaje.status + mensaje.statusText, '');
      }
    }
  }




  async fnObtenerVehiculoCliente(datos: Usuario) {
    try {

      const obtenVehiculoPorCliente = await this._clientesService.obtenerVehiculoporClientes(this.token, datos.client_id).toPromise();
      let respuestaDto = <RespuestaDto>obtenVehiculoPorCliente;
      if (obtenVehiculoPorCliente.ok) {
        this.vehiculos = <Vehiculo[]>respuestaDto.addenda;

      } else {
        this.mensajeAlerta.alerta("AVISO", "", respuestaDto.mensaje, "");
      }
      return obtenVehiculoPorCliente;
    } catch (error) {
      let mensaje = <any>error;
      if (mensaje && mensaje.status) {
        this.mensajeAlerta.alerta("ERROR", "", mensaje.status + mensaje.statusText, '');
      }
    }
  }


  async btnConfirmEliminarCliente() {
    try {
      this.confirmationService.confirm({
        message: 'Esta seguro de eliminar este perfil?',
        accept: () => {
          this.btnEliminarCliente();
        }
      })
    } catch (error) {
      let mensaje = <any>error;
      this.mensajeAlerta.alerta("ERROR", "", mensaje.status + mensaje.statusText, '');
    }
  }

  async btnEliminarCliente() {
    try {
      this.clientesForm.value.actualizar = true;
      this.clientesForm.value.client_estatus = 0;
      const eliminarCliente = await this._clientesService.setCliente(this.clientesForm.value).toPromise();
      let respuestaDto = <RespuestaDto>eliminarCliente;
      if (eliminarCliente.ok) {
        this.delete()

      } else {
        this.mensajeAlerta.alerta("AVISO", "", respuestaDto.mensaje, "");
      }
      return eliminarCliente;

    } catch (error) {
      let mensaje = <any>error;
      this.mensajeAlerta.alerta("ERROR", "", mensaje.status + mensaje.statusText, '');
    }

  }


  async btnEliminarVehiculo(vehiculo, index) {
    try {
      this.selectedVehiculo = vehiculo;
      console.log("selectedVehiculo", this.selectedVehiculo, vehiculo,index)
      if (vehiculo.client_id) {
        const eliminarVehiculo = await this._clientesService.fnEliminarVehiculo(vehiculo).toPromise();
        let respuestaDto = <RespuestaDto>eliminarVehiculo;
        if (eliminarVehiculo.ok) {
          this.deleteVehiculo();
        } else {
          this.mensajeAlerta.alerta("AVISO", "", respuestaDto.mensaje, "");
        }
        return eliminarVehiculo;

      } else {
        this.deleteVehiculo();
      }

    } catch (error) {
      let mensaje = <any>error;
      this.mensajeAlerta.alerta("ERROR", "", mensaje.status + mensaje.statusText, '');
    }

  }


  deleteVehiculo() {
    let index = this.vehiculos.indexOf(this.selectedVehiculo);
    console.log("INDEX", this.selectedVehiculo)
    this.vehiculos = this.vehiculos.filter((val, i) => i != index);
    this.showInfoViaToast();

  }

  async btnAgregarCliente() {
    if (this.vehiculos.length > 0) {
      if (this.clientesForm.valid) {
        try {

          this.show = true;
          this.clientesForm.value.actualizar = false;
          this.clientesForm.value.client_id = 0;
          this.clientesForm.value.client_estatus = 1;
          const nuevoCliente = await this._clientesService.setCliente(this.clientesForm.value).toPromise();
          let respuestaDto = <RespuestaDto>nuevoCliente;
          if (nuevoCliente.ok) {
            // this.vehiculos = <Vehiculo[]>respuestaDto.addenda;
            this.clientesForm.value.client_id = nuevoCliente.addenda[0].id_insertado;
            this.cliente_idSelected = this.clientesForm.value.client_id;
            this.clientesForm.value.client_no_vehiculo = this.vehiculos.length;
            if (this.vehiculos.length > 0) {
              for (let key in this.vehiculos) {
                this.vehiculos[key].client_id = this.cliente_idSelected
                var actualizarListaVehiculos = await this._clientesService.agregarVehiculo(this.vehiculos[key]).toPromise();
                this.vehiculos[key].vehiculo_id = actualizarListaVehiculos.addenda[0].id_insertado;
              }
            }

            this.show = false;
            this.save();
          } else {
            this.show = false;
            setTimeout(() => {
              this.mensajeAlerta.alerta("AVISO", "", respuestaDto.mensaje, "");

            })
          }
          return nuevoCliente;
        } catch (error) {
          let mensaje = <any>error;
          if (mensaje && mensaje.status) {
            this.mensajeAlerta.alerta("ERROR", "", mensaje.status + mensaje.statusText, '');
          }
        }
      } else {
        this.mensajeAlerta.alerta("AVISO", "", 'Verifica que todos los campos esten llenos.', "");

      }
    } else {
      this.mensajeAlerta.alerta("AVISO", "", 'El cliente debe tener asignado porlomenos un vehiculo', "");

    }
  }


  async btnActualizarCliente() {
    if (this.clientesForm.valid) {
      try {

        this.show = true;
        this.clientesForm.value.actualizar = true;
        this.clientesForm.value.client_estatus = 1;
        const actualziarCliente = await this._clientesService.setCliente(this.clientesForm.value).toPromise();
        let respuestaDto = <RespuestaDto>actualziarCliente;
        if (actualziarCliente.ok) {
          // this.vehiculos = <Vehiculo[]>respuestaDto.addenda;
          this.clientesForm.value.client_no_vehiculo = this.vehiculos.length;

          this.show = false;
          this.save();
        } else {
          this.show = false;
          this.mensajeAlerta.alerta("AVISO", "", respuestaDto.mensaje, "");
        }
        return actualziarCliente;
      } catch (error) {
        let mensaje = <any>error;
        if (mensaje && mensaje.status) {
          this.mensajeAlerta.alerta("ERROR", "", mensaje.status + mensaje.statusText, '');
        }
      }
    } else {
      this.mensajeAlerta.alerta("AVISO", "", 'Verifica que todos los campos esten llenos.', "");

    }
  }



  async btnAgregarVehiculoArray() {
    if (this.vehiculoForm.valid) {
      this.show = true;
      try {
        this.vehiculoForm.value.client_id = this.cliente_idSelected
        const actualizarListaVehiculos = await this._clientesService.agregarVehiculo(this.vehiculoForm.value).toPromise();
        if (actualizarListaVehiculos.ok) {
          this.show = false;
          let vehiculo_id = actualizarListaVehiculos.addenda[0].id_insertado;
          this.vehiculoForm.value.vehiculo_id = vehiculo_id;
          let vehiculos = [...this.vehiculos];
          this.vehiculos = vehiculos;
          vehiculos.push(this.vehiculoForm.value);
          setTimeout(() => {
            this.limpiarFomVehiculo();
            this.showSuccessViaToast();
            //  this.mensajeAlerta.alerta("AVISO", "", 'Se agrego correctamente su vehiculo', "");
          }, 300)
        } else {
          this.show = false;
          this.mensajeAlerta.alerta("AVISO", "", actualizarListaVehiculos.mensaje, "");
        }
      } catch (error) {
        this.show = false;
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("ERROR", "", mensaje.status + mensaje.statusText, '');
      }
    } else {
      this.mensajeAlerta.alerta("AVISO", "", 'Verifica que todos los campos esten llenos.', "");
    }
  }


  async btnAgregarVehiculoArrayTemporal() {
    if (this.vehiculoForm.valid) {
      try {
        let vehiculos = [...this.vehiculos];
        this.vehiculos = vehiculos;
        vehiculos.push(this.vehiculoForm.value);

        setTimeout(() => {
          this.limpiarFomVehiculo();
          this.showSuccessViaToast();
          //this.mensajeAlerta.alerta("AVISO", "", 'Se agrego correctamente su vehiculo', "");
        }, 300)
      } catch (error) {
        this.show = false;
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("ERROR", "", mensaje.status + mensaje.statusText, '');
      }
    } else {
      this.mensajeAlerta.alerta("AVISO", "", 'Verifica que todos los campos esten llenos.', "");
    }

  }


}
