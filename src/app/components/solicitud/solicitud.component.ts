import { Component, ViewChild, OnInit, NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AlertaComponent } from '../../util/alerta.component';
import { authGuardService } from '../../service/auth-guard.service';
import { RespuestaDto } from '../model/respuestaDto';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Ticket } from '../model/ticket.model';
import { Usuario } from '../model/usuario.model';
import { ticketService } from 'src/app/service/ticket.service';
import { Imagen } from '../model/imagene.model';
import { ImagenesBase64 } from '../model/imagenes.model';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent {

  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  @ViewChild('fileUploader', { static: false }) fileUpload: any;
  images = [] as any;
  displayCustom!: boolean;
  activeIndex: number = 0;
  token: string;
  tickets!: Ticket;
  sesionUsuario!: Usuario;
  arrayImagenes = new Array();
  recoInfo          !: FormGroup;
  idFolios!: string;
  responsiveOptions !: any[];
  ticke: any;

  constructor(
    private messageService: MessageService,
    private router: Router,
    public _authGuardService: authGuardService,
    public _ticketService: ticketService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.token = this._authGuardService.getToken();
    this.sesionUsuario = this._authGuardService.getUser();
    this.idFolios = this.route.snapshot.paramMap.get('id') as any;
    console.log(this.idFolios);
  }
  formulario() {
    this.recoInfo = this.fb.group({
      solucion: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.obtenerTickets(this.idFolios);
    this.formulario();
  }

  get form(): { [key: string]: AbstractControl } {
    return this.recoInfo.controls;
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }

  obtenerTickets(idFolios: string) {
    this._ticketService.getTicketsByid(this.token, idFolios).subscribe({
      next: (resp: RespuestaDto) => {
        let respuestaDto = <RespuestaDto>resp;

        if (respuestaDto.ok) {
          this.tickets = resp.addenda[0];
          if (this.tickets.foto1) {
            this.images.push(
              {
                "previewImageSrc": this.tickets.foto1,
                "thumbnailImageSrc": this.tickets.foto1,
              }
            ) as any;
          }
          if (this.tickets.foto2) {
            this.images.push(
              {
                "previewImageSrc": this.tickets.foto2,
                "thumbnailImageSrc": this.tickets.foto2,
              }
            ) as any;
          }
          if (this.tickets.foto3) {
            this.images.push(
              {
                "previewImageSrc": this.tickets.foto3,
                "thumbnailImageSrc": this.tickets.foto3,
              }
            ) as any;
          }
          if (this.tickets.foto4) {
            this.images.push(
              {
                "previewImageSrc": this.tickets.foto4,
                "thumbnailImageSrc": this.tickets.foto4,
              }
            ) as any;
          }
          console.log("this.tickets", this.tickets);

        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
 
actualizaradd(tickets: Ticket) {
  if (tickets.idfolios) {
    tickets.idstatusticket = 4;
    tickets.solucion = this.recoInfo.value.solucion;
    this._ticketService.actualizarTicketsolved(tickets)
      .subscribe(
        (response) => console.log('Estado actualizado correctamente'),
        (error) => console.log('Error al actualizar el estado', error)
      );
  }
}
 Cancelar() {
    this.recoInfo.reset();
   this.router.navigate(['/home/inicio/main/solicitudes']);
 }
   Servicio() {
    this.recoInfo.reset();
   this.router.navigate(['/home/inicio/main/servicio']);
  }
}
