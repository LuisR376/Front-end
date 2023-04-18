import { Component,ViewChild} from '@angular/core';
import { MessageService } from 'primeng/api';
import { Ticket } from '../model/ticket.model';
import { RespuestaDto } from '../model/respuestaDto';
import { AlertaComponent } from '../../util/alerta.component';
import { authGuardService } from '../../service/auth-guard.service';

import { ticketService } from 'src/app/service/ticket.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-reasignacion',
  templateUrl: './reasignacion.component.html',
  styleUrls: ['./reasignacion.component.css']
})
export class ReasignacionComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  token : string;
  tickets !: Ticket[];
  selectInfo!: Ticket;
  constructor(
    private fb: FormBuilder,
    public _authGuardService: authGuardService,
    public _ticketService: ticketService,
    ) {
      this.token = this._authGuardService.getToken();
    }

  
  ngOnInit() {
    this.obtenerTickets();
  }
   recoInfo = this.fb.group({
     idfolios: [''],
     fecha_registro : [''],
    idtipo_servicio: [''],
    num_folio: [''],
    num_empleado: [''],
    idstatusTicket: [''],
  });
//
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
}

