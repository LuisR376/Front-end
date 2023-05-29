import { Component, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../model/usuario.model';
import { CustomerService } from '../../service/CustomerService';
import { RespuestaDto } from '../model/respuestaDto';
import { authGuardService } from '../../service/auth-guard.service';
import { MessageService } from 'primeng/api';
import { AlertaComponent } from 'src/app/util/alerta.component';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { noNumbersValidator } from '../model/validatorPersonalizado';

import { UsuarioService } from '../../service/usuario.service';
import { Lugar } from '../model/lugar.model';
import { lugarAreas } from '../model/lugarArea.model';
import { Rol } from '../model/rol.model';
import * as Papa from 'papaparse';
//import * as customValidators from 'src/app/validaciones/validators.fuctions';
import { ValidatorsService } from 'src/app/service/validators.service';
@Component({
  selector: 'app-table-usuario',
  templateUrl: './table-usuario.component.html'
})
export class TableUsuarioComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  @Input() 
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  displayAddModal: boolean = false;
  sesionUsuario !: Usuario;
  token: string;
  usuarios: Usuario[] = [];
  usuari: any;
  submitted !: Usuario;
  products: Usuario = {};
  cols: any[] = [];
  selectedProducts: Usuario[] = [];
  deleteProductDialog: boolean = false;
  text !: boolean;
  texts !: boolean;
  lugares !: Lugar[];
  area !: lugarAreas[];
  roles !: Rol[];
  recoInfo!: FormGroup;
  opcionesEstado = [{ label: 'Activo', value: 1 },{ label: 'Inactivo', value: 0 }];
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private customerService: CustomerService,
    public _authGuardService: authGuardService,
    private usuarioService: UsuarioService,
    private validatorService:ValidatorsService
  ) {
    this.token = this._authGuardService.getToken();
    this.formulario();
  }
   get form(): { [key: string]: AbstractControl } {
    return this.recoInfo.controls;
   }
  
  isValidField(field:string) {
    return this.validatorService.isValidField(this.recoInfo, field);
  }
// Obtiene los errores asociados a un control específico del formulario.
  getControlErrors(controlName: string): any {
    const control = this.recoInfo.get(controlName);
    return control?.errors;
  }
  formulario(){
    this.recoInfo = this.fb.group({
    num_empleado: ['', [Validators.required ]],
    nombre      : ['', [Validators.required, Validators.pattern( this.validatorService.nombrePattern )]],
    apellidoP   : ['', [Validators.required, Validators.pattern( this.validatorService.nombrePattern )]],
    apellidoM   : ['', [Validators.required, Validators.pattern( this.validatorService.nombrePattern )]],
    email       : ['', [Validators.required, Validators.pattern( this.validatorService.emailPattern  )]],
    status      : ['', [Validators.required ]],
    idrol       : ['', [Validators.required ]],
    idlugar     : ['', [Validators.required ]],
    idarea      : ['', [Validators.required ]],
    password    : ['', [Validators.required, this.validatorService.validateNoQuery]],
    
    
  });
    console.log(this.recoInfo.errors);
}
  ngOnInit() {
    this.obtenerUsuarios();
    this.obtenerArea();
    this.obtenerLugar();
    this.obtenerRol();
  }
  onSubmit() {
    this.recoInfo.markAllAsTouched();
  }
isFieldInvalidAndTouched(fieldName: string): boolean | null {
  const control = this.recoInfo.get(fieldName);
  return control && control.invalid && control.touched ? true : null;
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
  obtenerLugar() {
    console.log("Token", this.token);
    this.customerService.getLugar(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Lugaaaaaaaaaaaaar", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.lugares = resp.addenda;
        } 
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  obtenerRol() {
    console.log("Token", this.token);
    this.customerService.getRol(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Rol", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.roles = resp.addenda;
        } 
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  obtenerUsuarios() {
    console.log("Token", this.token);
    this.customerService.fnusuario(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Obtener usuarios", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.usuarios = resp.addenda;
          this.usuarios = resp.addenda.map((objetoactivo: any) => {
          objetoactivo.status = objetoactivo.status === 1 ? "Activo" : "Inactivo";
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
  addUsuario() {
    console.log("this.recoInfo", this.recoInfo.value);
    
    if (this.recoInfo.invalid) {
      this.messageService.add({ severity: 'error', summary: 'No es posible acceder', detail: 'Porfavor verifique todos los campos' });
    } else {
      console.log("this.ecolecta informacion nombre", this.recoInfo.value.nombre)
      this.saveUsuario(this.recoInfo.value);
    }
    
  }
  
  async saveUsuario(recoInfo  : Usuario ) {
    console.log(
    "Usuario",    recoInfo.nombre, 
    "apellidoP",  recoInfo.apellidoP, 
    "apellidoM",  recoInfo.apellidoM, 
    "email",      recoInfo.email,
    "idrol",      recoInfo.idrol,
    "num_empleado",recoInfo.num_empleado,
    "idlugar",    recoInfo.idlugar,
    "idarea",     recoInfo.idarea, 
    "password",   recoInfo.password, 
    "status",     recoInfo.status);

    this.usuarioService.saveUsuario(recoInfo).subscribe({
      next: (resp: RespuestaDto) => {

        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.valido == 0) {
          console.log("next", respuestaDto.mensaje)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
        } else {
          this.usuari = <Usuario>respuestaDto.addenda;
          console.log("obtenerUsuarios",this.obtenerUsuarios);
          this.messageService.add({ severity: 'success', summary: 'Usuario Levantado', detail: respuestaDto.mensaje });
          this.recoInfo.reset();
          this.obtenerUsuarios();
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
  confirmDelete() {
    this.deleteProductDialog = false;
    this.usuarios = this.usuarios.filter(val => val.idUsuario !== this.products.idUsuario);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    this.products = {};
  }

  openNew() {
    this.displayAddModal = true;
  }
  closeModal() {
    this.recoInfo.reset();
    this.obtenerUsuarios();
  }
   exportCSV() {
    const csv = Papa.unparse(this.usuarios);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'usuarios.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
   }
  
}