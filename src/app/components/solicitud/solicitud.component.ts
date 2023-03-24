import { Component,ViewChild, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AlertaComponent } from '../../util/alerta.component';
import { authGuardService } from '../../service/auth-guard.service';
import { RespuestaDto } from '../model/respuestaDto';
import { CustomerService } from '../../service/CustomerService';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Ticket } from '../model/ticket.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  token: string;
  tickets !: Ticket[];
  id : number;   
    constructor(
      private messageService: MessageService,
      private customerService: CustomerService,
      public _authGuardService: authGuardService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      ) {
        this.token = this._authGuardService.getToken();
        this.id = this.route.snapshot.params['idfolios'];
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
    
    
      });
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
guardar(f:NgForm){
  console.log('submit disparado', f);
  console.log(f.value);
}
}
