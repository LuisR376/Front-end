import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { authGuardService } from 'src/app/service/auth-guard.service';
import { ticketService } from 'src/app/service/ticket.service';
import { AlertaComponent } from 'src/app/util/alerta.component';
import { Ticket } from '../model/ticket.model';
import { RespuestaDto } from '../model/respuestaDto';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { tipodeservicioService} from 'src/app/service/tipodeservicio.service'
import { tipodeservicio} from '../model/tipodeservicio.model'
import { reasignacion } from '../model/reasignacion.model';
import { tecnicoService } from 'src/app/service/tecnico.service';
import { Router,} from '@angular/router';
@Component({
  selector: 'app-reasignacion-byid',
  templateUrl: './reasignacion-byid.component.html',
  styleUrls: ['./reasignacion-byid.component.css']
})
export class ReasignacionByidComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  token        : string;
  tickets     !: Ticket;
  selectInfo  !: Ticket [] ;
  idFolios    !: string;
  recoInfo    !: FormGroup;
  servicio    !: tipodeservicio[];
  tecnicos    !:  tecnicoService[];
  constructor(
    private fb: FormBuilder,
    public _authGuardService: authGuardService,
    public _ticketService: ticketService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    public _tipodeservicioService:tipodeservicioService,

    public _tecnicoService:tecnicoService
  ) {
       this.token = this._authGuardService.getToken();
    this.idFolios = this.route.snapshot.paramMap.get('id') as any;
    console.log(this.idFolios);
   
  }
  formulario() {
    this.recoInfo = this.fb.group({
      numEmpl_Tecnicos  : ['',Validators.required],
      idtipo_servicio   : ['', Validators.required],
      idstatusticket    : ['',Validators.required]
        });
  }

  ngOnInit(): void {
    this.formulario();
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
         
          console.log("tickets", this.tickets);
         this.recoInfo.patchValue({
        idstatusticket: this.tickets.idstatusticket
      });
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
 }
  addTicket() {
    console.log("Datos ingresados:", this.recoInfo.value)
    if (this.recoInfo.invalid) {
      this.messageService.add({ severity: 'error', summary: 'No es posible agregar', detail: 'Porfavor verifique todos los campos' });
    } else {
      console.log("this.loginForm.value.usuarioLogin", this.recoInfo.value.numEmpl_Tecnicos)
      this.recoInfo.patchValue({
        idstatusticket: this.tickets.idstatusticket,
      });
      this.actualizarTicket(this.recoInfo.value);
    }
  }
  async actualizarTicket(recoInfo: Ticket) {
    console.log("datos del ticket", recoInfo)
    recoInfo.idfolios = this.tickets.idfolios;
    this._ticketService.actualizarTicket(recoInfo, this.idFolios).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Respeusta", resp)
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.valido == 0) {

          this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
        } else {
          this.messageService.add({ severity: 'success', summary: 'ASIGNADO', detail: respuestaDto.mensaje });
          this.recoInfo.reset();

        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
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
 Cancelar() {
    this.recoInfo.reset();
   this.router.navigate(['/home/inicio/main/reasignacion']);
  }
}

