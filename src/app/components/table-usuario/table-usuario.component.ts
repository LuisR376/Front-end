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
  opcionesEstado = [{ label: 'Inactivo', value: 0 },{ label: 'Activo', value: 1 }];
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private customerService: CustomerService,
    public _authGuardService: authGuardService,
    private usuarioService: UsuarioService
  ) {
    this.token = this._authGuardService.getToken();
    this.formulario();

  }
get num_empleadoNovalidado(){
  
  return this.recoInfo.get('num_empleado')?.invalid && this.recoInfo.get('num_empleado')?.touched;

}
get nombreNovalidado(){
  
  return this.recoInfo.get('nombre')?.invalid && this.recoInfo.get('nombre')?.touched;

}
get apellidoPNovalidado(){
  
  return this.recoInfo.get('apellidoP')?.invalid && this.recoInfo.get('apellidoP')?.touched;

}
get apellidoMNovalidado(){
  
  return this.recoInfo.get('apellidoM')?.invalid && this.recoInfo.get('apellidoM')?.touched;

}
get emailNovalidado(){
  
  return this.recoInfo.get('email')?.invalid && this.recoInfo.get('email')?.touched;

}
get statusNovalidado(){
  
  return this.recoInfo.get('status')?.invalid && this.recoInfo.get('status')?.touched;

}
get idrolNovalidado(){
  
  return this.recoInfo.get('idrol')?.invalid && this.recoInfo.get('idrol')?.touched;

}
get idlugarNovalidado(){
  
  return this.recoInfo.get('idlugar')?.invalid && this.recoInfo.get('idlugar')?.touched;

}
get idareaNovalidado(){
  
  return this.recoInfo.get('idarea')?.invalid && this.recoInfo.get('idarea')?.touched;

}
get passwordNovalidado(){
  
  return this.recoInfo.get('password')?.invalid && this.recoInfo.get('password')?.touched;

}
  getControlErrors(controlName: string): any {
    const control = this.recoInfo.get(controlName);
    return control?.errors;
  }
  formulario(){
  this.recoInfo = this.fb.group({
    num_empleado: ['', Validators.required],
    nombre      : ['', [Validators.required, noNumbersValidator()]],
    apellidoP   : ['', Validators.required],
    apellidoM   : ['', Validators.required],
    email       : ['', Validators.required,Validators.email],
    status      : ['', Validators.required],
    idrol       : ['', Validators.required],
    idlugar     : ['', Validators.required],
    idarea      : ['', Validators.required],
    password    : ['', Validators.required],
    
    
  });
    console.log(this.recoInfo.errors);
}
  ngOnInit() {
    this.obtenerUsuarios();
    this.obtenerArea();
    this.obtenerLugar();
    this.obtenerRol();
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