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


        idfolios: ['1'],
        idusuarios: ['26'],
        idtipo_servicio: ['1'],
        asunto: [''],
        mensaje: [''],
        foto1: ['1'],
        foto2: ['1'],
        foto3: ['1'],
        foto4: ['1'],
        solucion: ['1'],
        firma: ['1'],
        estado_ticket: ['1'],
        nombre: [''],
        Descripcion: [''],
        num_folio: [''],
        num_empleado: [''],
        idstatusTicket: ['2'],
    
    
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
