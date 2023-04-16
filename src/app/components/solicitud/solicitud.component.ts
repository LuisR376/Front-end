import { Component, ViewChild, OnInit, NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { AlertaComponent } from '../../util/alerta.component';
import { authGuardService } from '../../service/auth-guard.service';
import { RespuestaDto } from '../model/respuestaDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Ticket } from '../model/ticket.model';
import { NgForm } from '@angular/forms';
import { Usuario } from '../model/usuario.model';
import { FolioService } from 'src/app/service/folio.service';
import { ticketService } from 'src/app/service/ticket.service';
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent {

  images =  [] as any;
  displayCustom!: boolean;
  activeIndex: number = 0;


  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  token: string;
  tickets !: Ticket;

  idFolio !: number;
  sesionUsuario !: Usuario;
  arrayImagenes = new Array();
  id !: number;
  recoInfo: FormGroup;
  idFolios!: string;
  displayBasic2: boolean = true;
  responsiveOptions!: any[];
  texto: string = '';
  constructor(
    private messageService: MessageService,
    private router: Router,
    public _authGuardService: authGuardService,
    public _ticketService: ticketService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _folioService: FolioService
  ) {
    this.recoInfo = this.fb.group({
      idfolios: ['', [Validators.required]],
      idusuarios: [''],
      idtipo_servicio: [''],
      asunto: [''],
      mensaje: [''],
      foto1: [''],
      foto2: [''],
      foto3: [''],
      foto4: [''],
      solucion: ['', [Validators.required]],
      firma: [''],
      estado_ticket: [''],
      nombre: [''],
      Descripcion: [''],
      num_folio: ['', [Validators.required]],
      num_empleado: [''],
      idstatusTicket: [''],


    });
    this.token = this._authGuardService.getToken();
    this.sesionUsuario = this._authGuardService.getUser();
    this.idFolios = this.route.snapshot.paramMap.get('id') as any;
    
    console.log(this.idFolios);

  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
}

  ngOnInit(): void {


    this.obtenerTickets(this.idFolios);
    
    this.responsiveOptions = [
      {
        breakpoint: '1500px',
        numVisible: 4
      },
      {
        breakpoint: '1024px',
        numVisible: 4
      },
      {
        breakpoint: '768px',
        numVisible: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1
      }
    ];
   
    
  }
  openNew() {
    this.displayBasic2 = true;
  }


  obtenerTickets(idFolios: string) {
    this._ticketService.getTicketsByid(this.token, idFolios).subscribe({
      next: (resp: RespuestaDto) => {
        let respuestaDto = <RespuestaDto>resp;

        if (respuestaDto.ok) {
          this.tickets = resp.addenda[0];
          if( this.tickets.foto1 ){
            this.images.push(
              {
                  "previewImageSrc": this.tickets.foto1,
                  "thumbnailImageSrc": this.tickets.foto1,
              }
           )  as any;
          }
          if( this.tickets.foto2 ){
            this.images.push(
              {
                  "previewImageSrc": this.tickets.foto2,
                  "thumbnailImageSrc": this.tickets.foto2,
              }
           )  as any;
          }
          if( this.tickets.foto3 ){
            this.images.push(
              {
                  "previewImageSrc": this.tickets.foto3,
                  "thumbnailImageSrc": this.tickets.foto3,
              }
           )  as any;
          }
          if( this.tickets.foto4 ){
            this.images.push(
              {
                  "previewImageSrc": this.tickets.foto4,
                  "thumbnailImageSrc": this.tickets.foto4,
              }
           )  as any;
          }
          console.log("icketddd", this.tickets);
          
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  //Si el formulario es invalido
  async addTicket() {

    if (this.recoInfo.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Porfavor verifique todos los campos' });
    } else if (this.arrayImagenes.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Porfavor adjunte algunas imagenes' });

    }
  }
  selectProduct(solicitud: Ticket) {
    this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: solicitud.nombre });
  }
  guardar(f: NgForm) {
    console.log('submit disparado', f);
    console.log(f.value);
  }

  async saveFolio(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._folioService.saveFolio(this.token).subscribe({
        next: (resp: RespuestaDto) => {
          let respuestaDto = <RespuestaDto>resp;
          if (respuestaDto.valido == 0) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
          } else {
            this.idFolio = <number>respuestaDto.addenda[0].idfolios;
            resolve(this.idFolio);
          }
        },
        error: (error) => {
          let mensaje = <any>error;
          reject(mensaje);
          this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
        }
      });

    });
  }
  async saveTicket(recoInfo: Ticket) {
    console.log("datos del ticket", recoInfo)
    recoInfo.idusuarios = this.sesionUsuario.idUsuario;
    await this.getSetterImages(recoInfo);
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
  async getSetterImages(recoInfo: Ticket) {
    return new Promise((resolve, reject) => {
      switch (this.arrayImagenes.length) {
        case 1:
          recoInfo.foto1 = this.arrayImagenes[0].imagen;
          break;
      }

      resolve(recoInfo);
    });



  }
}
