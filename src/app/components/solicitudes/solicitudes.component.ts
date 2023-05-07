import { Component, ViewChild, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AlertaComponent } from '../../util/alerta.component';
import { authGuardService } from '../../service/auth-guard.service';
import { RespuestaDto } from '../model/respuestaDto';
import { ActivatedRoute} from '@angular/router';
import { Ticket } from '../model/ticket.model';
import { NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ticketService } from 'src/app/service/ticket.service';
import { Usuario } from '../model/usuario.model';
@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
})
export class SolicitudesComponent implements OnInit {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  token: string;
  tickets !: Ticket[];
  selectInfo !: Ticket;
  ticket!: Ticket;
  sesionUsuario !: Usuario;
  constructor(
    private messageService: MessageService,
  
    private activatedRoute: ActivatedRoute,

    private fb: FormBuilder,
    
    public _authGuardService: authGuardService,
    public _ticketService: ticketService,
    
  ) {
    this.token = this._authGuardService.getToken();
    this.sesionUsuario = this._authGuardService.getUser();
  }
  ngOnInit() {
    this.obtenerTickets();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  obtenerTickets() {
    this._ticketService.getTicket(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.tickets = resp.addenda;
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  selectProduct(solicitud: Ticket) {
    this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: solicitud.nombre });
  }
  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  actualizarEstado(tickets: Ticket) {

    if (tickets.idfolios) {
      
      if((this.sesionUsuario.clave === 'TEC' || this.sesionUsuario.clave === 'ADM') ){
        tickets.idstatusticket=3
        this._ticketService.actualizarTicketabierto(tickets)
        .subscribe(
          (response) => console.log('Estado actualizado correctamente'),
          (error) => console.log('Error al actualizar el estado', error)
        );
      }
     
    }
  }    
}
