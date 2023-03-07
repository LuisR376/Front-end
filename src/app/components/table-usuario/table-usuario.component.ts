import { Component, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../model/usuario.model';
import { CustomerService } from '../../service/CustomerService';
import { RespuestaDto } from '../model/respuestaDto';
import { authGuardService } from '../../service/auth-guard.service';
import { MessageService } from 'primeng/api';
import { AlertaComponent } from 'src/app/util/alerta.component';
import { FormBuilder, Validators } from '@angular/forms';
import { insertUsuario } from '../model/insertUsuario';
import { UsuarioService } from '../../service/usuario.service';
import { Lugar } from '../model/lugar.model';
import { lugarAreas } from '../model/lugarArea.model';
import { Rol } from '../model/rol.model';

@Component({
  selector: 'app-table-usuario',
  templateUrl: './table-usuario.component.html',
})
export class TableUsuarioComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  @Input() displayAddModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
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
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private customerService: CustomerService,
    public _authGuardService: authGuardService,
    private usuarioService: UsuarioService
  ) {
    this.token = this._authGuardService.getToken();
  }
  recoInfo = this.fb.group({
    num_empleado: ['', Validators.required],
    nombre: ['', Validators.required],
    apellidoP: ['', Validators.required],
    apellidoM: ['', Validators.required],
    email: ['', Validators.required],
    status:['', Validators.required],
    idrol: ['', Validators.required],
    idlugar: ['', Validators.required],
    idarea: ['', Validators.required],
    password: ['', Validators.required],
    
    
  });
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
        } else {
        } // if
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
      this.saveUsuario(
        this.recoInfo.value.nombre, 
        this.recoInfo.value.apellidoP, 
        this.recoInfo.value.apellidoM, 
        this.recoInfo.value.email,
        this.recoInfo.value.idrol,
        this.recoInfo.value.num_empleado,
        this.recoInfo.value.idlugar,
        this.recoInfo.value.idarea,
        this.recoInfo.value.password,
        this.recoInfo.value.status,
        );
    }
  }
  
  async saveUsuario(
    
    nombre: string | undefined | null, 
    apellidoP: string | undefined | null, 
    apellidoM: string | undefined | null, 
    email: string | undefined | null,
    idrol: string | undefined | null,
    num_empleado: string | undefined | null,
    idlugar: string | undefined | null,
    idarea:string | undefined | null,
    password: string | undefined | null,
    status:string | undefined | null,

    ) {
      console.log("VERRRRRRRRRRRRRREEEEEEEE",this.saveUsuario);
    console.log(
    "Usuario", nombre, 
    "apellidoP", apellidoP, 
    "apellidoM", apellidoM, 
    "email", email,
    "idrol",idrol,
    "num_empleado",num_empleado,
    "idlugar",idlugar,
    "idarea", idarea, 
    "password",password, 
    "status", status);
    let datosA = new insertUsuario(nombre, 
      apellidoP, apellidoM, email, idrol, num_empleado, idlugar, idarea, password, status);
    console.log("VERRRRRRRRRRRRRREEEEEEEE",this.saveUsuario);
    console.log("Datos Area", datosA);
    this.usuarioService.saveUsuario(datosA).subscribe({
      next: (resp: RespuestaDto) => {

        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.valido == 0) {
          console.log("next", respuestaDto.mensaje)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
        } else {
          this.usuari = <Usuario>respuestaDto.addenda;
          console.log("obtenerUsuarios",this.obtenerUsuarios);
          
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
    this.usuari = {};
    this.text = false;
    this.texts = true;
  }
  closeModal() {
    this.recoInfo.reset();
    this.obtenerUsuarios();
  }
}