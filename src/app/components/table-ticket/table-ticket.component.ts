import { Component, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Ticket } from '../model/ticket.model';
import { CustomerService } from '../../service/CustomerService';
import { RespuestaDto } from '../model/respuestaDto';
import { AlertaComponent } from '../../util/alerta.component';
import { authGuardService } from '../../service/auth-guard.service';
import { Usuario } from '../model/usuario.model';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';



import { Imagen } from '../model/imagene.model';
import { ImagenesBase64 } from '../model/imagenes.model';
import { EstatusTicket } from '../model/estatusTicket.model';
import { lugarAreas } from '../model/lugarArea.model';
import { Lugar } from '../model/lugar.model';
import { FolioService } from 'src/app/service/folio.service';

import { ticketService } from 'src/app/service/ticket.service';
import { ValidatorsService } from 'src/app/service/validators.service';

@Component({
  selector: 'app-table-ticket',
  templateUrl: './table-ticket.component.html',
  styleUrls: ['./table-ticket.component.css']
})
export class TableTicketComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  @ViewChild('fileUploader', { static: false }) fileUpload: any;

  @Input()
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  products: Ticket = {};
  token: string;
  ticket: Ticket[] = [];
  tickets !: Ticket[];
  sesionUsuario !: Usuario;
  text !: boolean;
  texts !: boolean;
  ticke: any;
  arrayImagenes = new Array();
  displayAddModal: boolean = false;
  deleteProductDialog: boolean = false;
  altaTicket !: Ticket;
  estatusTicket !: EstatusTicket;
  area !: lugarAreas[];
  lugares !: Lugar[];
  idFolio !: number;
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private customerService: CustomerService,
    private _folioService: FolioService,
    public _authGuardService: authGuardService,
    public _ticketService: ticketService,
    private validatorService:ValidatorsService
  ) {
    this.token = this._authGuardService.getToken();
    this.sesionUsuario = this._authGuardService.getUser();
  }

  ngOnInit() {
    this.obtenerTickets();
    this.obtenerArea();
    this.obtenerLugar();
  }


  recoInfo = this.fb.group({
    idfolios    : [''],
    idlugar     : ['', [Validators.required]],
    idarea      : ['', [Validators.required]],
    idusuarios  : [''],
    asunto      : ['', [Validators.required, this.validatorService.validateNoQuery]],
    mensaje     : ['', [Validators.required, this.validatorService.validateNoQuery]],
    foto1       : [''],
    foto2       : [''],
    foto3       : [''],
    foto4       : ['']
  });

  get form(): { [key: string]: AbstractControl } {
    return this.recoInfo.controls;
  }
  isFieldInvalidAndTouched(fieldName: string): boolean | null {
    const control = this.recoInfo.get(fieldName);
    return control && control.invalid && control.touched ? true : null;
  }
  openNew() {

    this.displayAddModal = true;
    this.recoInfo.reset();
    this.clearSelectedPhoto();

  }

  LimpiarModal() {
    this.recoInfo.reset(); // Restablece los valores de los campos de texto e input

  // Elimina los errores en los controles
  Object.keys(this.recoInfo.controls).forEach(controlName => {
    const control = this.recoInfo.get(controlName);
    control?.setErrors(null);
  });

  this.obtenerTickets(); // Llama a la función obtenerTickets() u otras tareas necesarias
  }

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



  obtenerArea() {
    console.log("Token", this.token);
    this.customerService.getArea(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.area = resp.addenda;
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  obtenerLugar() {
    this.customerService.getLugar(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.lugares = resp.addenda;
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }


  async addTicket() {

    if (this.recoInfo.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Porfavor verifique todos los campos' });
    } else if (this.arrayImagenes.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Porfavor adjunte algunas imagenes' });

    } else {
      let datosTicket: Ticket = this.recoInfo.value as Ticket;
      let idFolio: number = await this.saveFolio();
      datosTicket.idfolios = idFolio;
      this.saveTicket(datosTicket);
    }

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

          this.ticke = <Ticket>respuestaDto.addenda;
          this.obtenerTickets();
          this.displayAddModal = false;
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
  async getSetterImages(recoInfo: Ticket) {
    this.arrayImagenes.slice(0, 4).forEach((img, idx) => {
      const key = `foto${idx + 1}` as keyof Ticket;
      recoInfo[key] = img.imagen;
    });
  }





  confirmDelete() {
    this.deleteProductDialog = false;
    this.ticket = this.ticket.filter(val => val.idfolios !== this.products.idfolios);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    this.products = {};
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

  clearSelectedPhoto() {
    this.fileUpload.clear();
  }


}
