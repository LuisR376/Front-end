import { Component, ViewChild, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AlertaComponent } from '../../util/alerta.component';
import { authGuardService } from '../../service/auth-guard.service';
import { RespuestaDto } from '../model/respuestaDto';
import { CustomerService } from '../../service/CustomerService';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Ticket } from '../model/ticket.model';
import { identifierName } from '@angular/compiler';
import { NgForm } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { FolioService } from 'src/app/service/folio.service';
import { ticketService } from 'src/app/service/ticket.service';
@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
})
export class SolicitudesComponent implements OnInit {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  token: string;
  tickets !: Ticket[];
  selectedProduct1 !: Ticket;
  ticket!: Ticket;
  
  constructor(
    private messageService: MessageService,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    
    public _authGuardService: authGuardService,
    public _ticketService: ticketService,
  ) {
    this.token = this._authGuardService.getToken();
    
  }
  ngOnInit() {
    this.obtenerTickets();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
  }
  recoInfo = this.fb.group({
    idfolios: [''],
    idusuarios: [''],
    idtipo_servicio: [''],
    asunto: [''],
    mensaje: [''],
    foto1: [''],
    foto2: [''],
    foto3: [''],
    foto4: [''],
    solucion: [''],
    firma: [''],
    estado_ticket: [''],
    nombre: [''],
    Descripcion: [''],
    num_folio: [''],
    num_empleado: [''],
    idstatusTicket: [''],
    nombre_area: [],
    lugares: ['']

  });
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
  guardar(forma: NgForm) {
    console.log('submit disparado', forma);
    console.log(forma.value);
  }
  
}
