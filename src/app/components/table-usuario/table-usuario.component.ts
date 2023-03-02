import { Component,ViewChild, EventEmitter, Input,Output } from '@angular/core';
import { Usuario } from '../model/usuario.model';
import { CustomerService } from '../../service/CustomerService';
import { RespuestaDto } from '../model/respuestaDto';
import { authGuardService } from '../../service/auth-guard.service';
import { MessageService } from 'primeng/api';
import { AlertaComponent } from 'src/app/util/alerta.component';
import { FormBuilder, Validators } from '@angular/forms';
import { insertUsuario } from '../model/insertUsuario';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-table-usuario',
  templateUrl: './table-usuario.component.html',
})
export class TableUsuarioComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  @Input() displayAddModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private customerService: CustomerService,
    public _authGuardService: authGuardService,
    private usuarioService: UsuarioService
    ) {
      this.token = this._authGuardService.getToken();
      
    }
    token : string;
    usuarios !: Usuario[];
    usuari : any;
    submitted !: Usuario;
    text !: boolean;
    texts !: boolean;

    recoInfo = this.fb.group({
      fecha:['', Validators.required],
      idrol:['', Validators.required],
      num_empleado:['', Validators.required],
      nombre:['', Validators.required],
      apelllidoP:['', Validators.required],
      apellidoM:['', Validators.required],
      idlugar:['', Validators.required],
      idarea:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
    });
  ngOnInit() {
    this.obtenerUsuarios();
  }
obtenerUsuarios(){
  console.log("Token",this.token);
    this.customerService.fnusuario(this.token).subscribe({
      next : (resp: RespuestaDto)  => {
        console.log("Obtener usuarios",resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.usuarios = resp.addenda;
        } else {

        } // if
      },
        error : (error) => {
          let mensaje = <any>error;
          this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
        }
      });
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
  addUsuario() {
    console.log("this.loginForm",this.recoInfo.value)
    if(this.recoInfo.invalid){
      this.messageService.add({severity:'error', summary:'No es posible acceder', detail:'Porfavor verifique todos los campos'});
    }else{
      console.log("this.loginForm.value.usuarioLogin", this.recoInfo.value.nombre)
       this.saveUsuario( this.recoInfo.value.nombre, this.recoInfo.value.apelllidoP, this.recoInfo.value.apellidoM);
    }
  }
    async saveUsuario(nombre : string | undefined | null, apelllidoP : string | undefined | null, apellidoM: string|undefined|null) {
    console.log("Usuario", nombre, "apellidoP", apelllidoP,"apellido",apellidoM);
    let datosA = new insertUsuario (nombre, apelllidoP, apellidoM);
    console.log("Datos Area", datosA);
    this.usuarioService.saveUsuario(datosA).subscribe({
      next: (resp: RespuestaDto) => {

        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.valido == 0) {
          console.log("next", respuestaDto.mensaje)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
        } else {
          this.usuari = <Usuario>respuestaDto.addenda;
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
}