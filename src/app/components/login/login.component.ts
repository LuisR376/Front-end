import { Component, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { loginUsuario } from "src/app/components/model/login.model";
import { RespuestaDto } from "src/app/components/model/respuestaDto";
import { Usuario } from "src/app/components/model/usuario.model";
import { authGuardService } from "src/app/service/auth-guard.service";
import { UsuarioService } from "src/app/service/usuario.service";
import { AlertaComponent } from "src/app/util/alerta.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;

  constructor(
     private _formBuilder: FormBuilder,
     private messageService: MessageService,
     private _usuarioService: UsuarioService,
     public _authGuardService: authGuardService,
     private router: Router

     ) {}
  usuarioVacio !:boolean;
  contrasenaVacia !:boolean;
  usuario!: Usuario;
 
    loginForm = this._formBuilder.group({
    usuarioLogin:  ['',[Validators.required, Validators.minLength(4)]],
    contrasenaLogin: ['',[Validators.required, Validators.maxLength(15)]]

  });
  fnLogueo(){
    console.log("this.loginForm",this.loginForm.value)
    if(this.loginForm.invalid){
      this.messageService.add({severity:'error', summary:'No es posible acceder', detail:'Porfavor verifique todos los campos'});
    }else{
      console.log("this.loginForm.value.usuarioLogin", this.loginForm.value.usuarioLogin)
       this.iniciarSesion( this.loginForm.value.usuarioLogin , this.loginForm.value.contrasenaLogin);
    }
  }

  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  
  async iniciarSesion(usuario : string  | undefined | null, contrasena : string  | undefined | null) {
    console.log("usuario", usuario , "contrasena" , contrasena);
    
    let datosInicioSesion = new loginUsuario(usuario , contrasena );
    console.log("datosSesion", datosInicioSesion);
    this._usuarioService.iniciarSesion(datosInicioSesion ).subscribe({
      next : (resp: RespuestaDto)  => {
      
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.valido == 0) {
          console.log("next", respuestaDto.mensaje)
          this.messageService.add({severity:'error', summary:'Error', detail:respuestaDto.mensaje});
        } else {

          this.usuario = <Usuario>respuestaDto.addenda;
        console.log("Response de logeo",this.usuario );
        
          // this.obtenerMenu(respuestaDto.token , this.usuario);
          this._authGuardService.sendToken(this.usuario);
          this._authGuardService.sendKey(respuestaDto.token);
          this.router.navigate(["/home/inicio/main/Ticket"]);
        } // if
        
      },
        error : (error) => {
          let mensaje = <any>error;
          this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
        }
      });
    
  }
}
