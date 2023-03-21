import { Component,ViewChild, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AlertaComponent } from '../../util/alerta.component';
import { authGuardService } from '../../service/auth-guard.service';
import { RespuestaDto } from '../model/respuestaDto';
import { CustomerService } from '../../service/CustomerService';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Ticket } from '../model/ticket.model';
@Component({
  selector: 'app-info-ticket',
  templateUrl: './info-ticket.component.html',
  styleUrls: ['./info-ticket.component.css']
})
export class InfoTicketComponent implements OnInit {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  token: string;
  tickets !: Ticket[];
  id : number;   
    constructor(
      private messageService: MessageService,
      private customerService: CustomerService,
      public _authGuardService: authGuardService,
      private route: ActivatedRoute
      ) {
        this.token = this._authGuardService.getToken();
        this.id = this.route.snapshot.params['idfolios'];
      }
      
  ngOnInit() {
    this.obtenerTickets();
  }
  obtenerTickets() {
    console.log("Token", this.token);
    this.customerService.getTicket(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Obtener tickets", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.tickets = resp.addenda;
        } else {

        } // if
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  selectProduct(solicitud: Ticket) {
    this.messageService.add({severity:'info', summary:'Product Selected', detail: solicitud.nombre});
}

}
