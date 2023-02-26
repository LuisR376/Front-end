import { Component,ViewChild } from '@angular/core';
import { Usuario } from '../model/usuario.model';
import { CustomerService } from '../../service/CustomerService';
import { RespuestaDto } from '../model/respuestaDto';
import { authGuardService } from '../../service/auth-guard.service';
import { MessageService } from 'primeng/api';
import { AlertaComponent } from 'src/app/util/alerta.component';

@Component({
  selector: 'app-table-usuario',
  templateUrl: './table-usuario.component.html',
})
export class TableUsuarioComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  token : string;
  usuarios !: Usuario[];

  constructor(
    private messageService: MessageService,
    private customerService: CustomerService,
    public _authGuardService: authGuardService,
    
    ) {
      this.token = this._authGuardService.getToken();

    }
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
}
