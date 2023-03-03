import { Component,OnInit, ViewChild} from '@angular/core';
import { MessageService } from 'primeng/api';
import { Ticket } from '../model/ticket.model';
import { CustomerService } from '../../service/CustomerService';
import { RespuestaDto } from '../model/respuestaDto';
import { AlertaComponent } from '../../util/alerta.component';
import { authGuardService } from '../../service/auth-guard.service';
import { Usuario } from '../model/usuario.model';


@Component({
  selector: 'app-table-ticket',
  templateUrl: './table-ticket.component.html',
  styleUrls: ['./table-ticket.component.css']
})
export class TableTicketComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  token : string;
  tickets !: Ticket[];
  sesionUsuario !: Usuario;
  constructor(
    private messageService: MessageService,
    private customerService: CustomerService,
    public _authGuardService: authGuardService
    ) {
      this.token = this._authGuardService.getToken();
      this.sesionUsuario = this._authGuardService.getUser();
    }

  
  ngOnInit() {
    debugger
    console.log("entraa")
    this.obtenerTickets();
    
  }
//
obtenerTickets(){
  console.log("Token",this.token);
    this.customerService.getTicket(this.token).subscribe({
      next : (resp: RespuestaDto)  => {
        console.log("Obtener tickets",resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.tickets = resp.addenda;
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

