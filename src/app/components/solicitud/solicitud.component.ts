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
      firma: ['', [Validators.required]],
      idstatusticket: ['', Validators.required]
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
  //Si el formulario es invalido
  
  async addTicket() {

    if (this.recoInfo.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Porfavor verifique todos los campos' });
    } else if (this.arrayImagenes.length == 0) {  
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Porfavor adjunte algunas imagenes' });
    } else {
       this.recoInfo.patchValue({
        idstatusticket: this.tickets.idstatusticket,
      });
      let datosTicket: Ticket = this.recoInfo.value as Ticket;
      this.actualizarTicketabierto(datosTicket);
    }
  }
  async actualizarTicketabierto(recoInfo: Ticket) {
    console.log("datoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooos del ticket", recoInfo)
    recoInfo.idfolios = this.tickets.idfolios;
    await this.getSetterImages(recoInfo);
    this._ticketService.actualizarTicketabierto(recoInfo, this.idFolios).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Respeusta", resp)
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.valido == 0) {

          this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Mensaje', detail: respuestaDto.mensaje });

          this.ticke = <Ticket>respuestaDto.addenda;
          this.obtenerTickets(this.idFolios);
          this.recoInfo.reset();
          this.clearSelectedPhoto();
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  clearSelectedPhoto() {
    this.fileUpload.clear();
  }
  async getSetterImages(recoInfo: Ticket) {
    return new Promise((resolve, reject) => {
      switch (this.arrayImagenes.length) {
        case 1:
          recoInfo.firma = this.arrayImagenes[0].imagen;
          break;
      }

      resolve(recoInfo);
    });
  }
  async subirimg(event: any) {
    this.arrayImagenes = [];
    let conversion: ImagenesBase64 = await this.convertB64(event);   //jalar las imagenes y ponerlas dentro del arreglo
    this.arrayImagenes = conversion;
    console.log("arrayImagenes", this.arrayImagenes);
  }
  async convertB64(event: any): Promise<ImagenesBase64> {

    return new Promise((resolve, reject) => {
      var lista: ImagenesBase64 = [];
      var imagenes = event.currentFiles;
      let imagen: Imagen;
      var terminados = 0;
      for (let key in imagenes) {
        let reader = new FileReader();
        imagen = imagenes[key];
        reader.readAsDataURL(imagenes[key]);
        reader.onload = (imagen) => {
          lista.push({ imagen: reader.result?.toString() });
        }
        reader.onerror = function (error) {
          console.log('Error', error);
          reject(error);
        }
        reader.onloadend = function (end) {
          terminados++;
          if (imagenes.length == terminados) {
            resolve(lista);
          }
        }
      }
    })
  }
  eliminaImagen(event: any) {
    setTimeout(() => {
      let files = { currentFiles: event._files };
      this.subirimg(files);
    }, 500)
  }

}
