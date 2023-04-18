import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { authGuardService } from 'src/app/service/auth-guard.service';
import { ticketService } from 'src/app/service/ticket.service';
import { AlertaComponent } from 'src/app/util/alerta.component';
import { Ticket } from '../model/ticket.model';
import { RespuestaDto } from '../model/respuestaDto';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reasignacion-byid',
  templateUrl: './reasignacion-byid.component.html',
  styleUrls: ['./reasignacion-byid.component.css']
})
export class ReasignacionByidComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  token        : string;
  tickets     !: Ticket;
  selectInfo  !: Ticket;
  idFolios    !: string;
  recoInfo: FormGroup;
  prioridad !: Ticket[];
  constructor(
    private fb: FormBuilder,
    public _authGuardService: authGuardService,
    public _ticketService: ticketService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
       this.token = this._authGuardService.getToken();
    this.idFolios = this.route.snapshot.paramMap.get('id') as any;
    console.log(this.idFolios);
    this.recoInfo = this.fb.group({
      idfolios        : [''],
      fecha_registro  : [''],
      idtipo_servicio : [''],
      num_folio       : [''],
      num_empleado    : [''],
      idstatusTicket  : [''],
    });
  }

  ngOnInit(): void {
    this.obtenerTickets(this.idFolios);
  }

 obtenerTickets(idFolios: string) {
    this._ticketService.getTicketsByid(this.token, idFolios).subscribe({
      next: (resp: RespuestaDto) => {
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.tickets = resp.addenda[0];
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  async saveTicket(recoInfo: Ticket) {
    console.log("datos del ticket", recoInfo)
    this._ticketService.saveTicket(recoInfo).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Respeusta", resp)
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.valido == 0) {

          this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Mensaje', detail: respuestaDto.mensaje });


          this.recoInfo.reset();

        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  addTicket() {
    if (this.recoInfo.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor verifique todos los campos' });
    }
  }

}

