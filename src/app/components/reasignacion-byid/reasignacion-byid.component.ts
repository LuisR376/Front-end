import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { authGuardService } from 'src/app/service/auth-guard.service';
import { ticketService } from 'src/app/service/ticket.service';
import { AlertaComponent } from 'src/app/util/alerta.component';
import { Ticket } from '../model/ticket.model';
import { RespuestaDto } from '../model/respuestaDto';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import {tipodeservicioService} from 'src/app/service/tipodeservicio.service'
import {tipodeservicio} from '../model/tipodeservicio.model'
import { reasignacionService } from 'src/app/service/reasignacion.service';
import { reasignacion } from '../model/reasignacion.model';
import { tecnicoService } from 'src/app/service/tecnico.service';
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
  recoInfo     : FormGroup;
  servicio    !: tipodeservicio[];
  tecnicos    !:  tecnicoService[];
  constructor(
    private fb: FormBuilder,
    public _authGuardService: authGuardService,
    public _ticketService: ticketService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    public _tipodeservicioService:tipodeservicioService,
    public _reasignacionService:reasignacionService,
    public _tecnicoService:tecnicoService
  ) {
       this.token = this._authGuardService.getToken();
    this.idFolios = this.route.snapshot.paramMap.get('id') as any;
    console.log(this.idFolios);
    this.recoInfo = this.fb.group({
      idfolios        : [''],
      fecha_registro: [''],
      idusuarios: [''],
      idtipo_servicio : [''],
      num_folio       : [''],
      num_empleado    : [''],
      idstatusTicket  : [''],
    });
  }

  ngOnInit(): void {
    this.obtenerTickets(this.idFolios);
    this.obtenerTipodeServicio();
    this.obtenerTecnicos();
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
  obtenerTipodeServicio() {
    console.log("Token", this.token);
    this._tipodeservicioService.getServicio(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("servicios", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.servicio = resp.addenda;
        }
        console.log("this.servicio", this.servicio);
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  obtenerTecnicos() {
    console.log("Token", this.token);
    this._tecnicoService.fntecnico(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Obtener tecnicos", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.tecnicos = resp.addenda;
        } else {
        }  console.log("this.tecnicos", this.tecnicos);
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }

}

