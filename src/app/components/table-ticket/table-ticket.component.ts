import { Component, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Ticket } from '../model/ticket.model';
import { CustomerService } from '../../service/CustomerService';
import { RespuestaDto } from '../model/respuestaDto';
import { AlertaComponent } from '../../util/alerta.component';
import { authGuardService } from '../../service/auth-guard.service';
import { Usuario } from '../model/usuario.model';
import { FormBuilder, Validators } from '@angular/forms';
import { insertTicket } from '../model/insertTicket';

import { Imagen } from '../model/imagene.model';
import { ImagenesBase64 } from '../model/imagenes.model';

@Component({
  selector: 'app-table-ticket',
  templateUrl: './table-ticket.component.html',
  styleUrls: ['./table-ticket.component.css']
})
export class TableTicketComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
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

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private customerService: CustomerService,
    public _authGuardService: authGuardService,

  ) {
    this.token = this._authGuardService.getToken();
    this.sesionUsuario = this._authGuardService.getUser();
  }
  ngOnInit() {
    
    console.log("entraa")
    this.obtenerTickets();

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

  openNew() {
  
    this.displayAddModal = true;
  }

  closeModal() {
    this.recoInfo.reset();
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


  addTicket() {
    console.log("this.recoInfo", this.recoInfo.value);

    if (this.recoInfo.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Porfavor verifique todos los campos' });
    } else {
      console.log("this.ecolecta informacion nombre", this.recoInfo.value.asunto)
      this.saveTicket(
        this.recoInfo.value.idfolios,
        this.recoInfo.value.idusuarios,
        this.recoInfo.value.idtipo_servicio,
        this.recoInfo.value.asunto,
        this.recoInfo.value.mensaje,
        this.recoInfo.value.foto1,
        this.recoInfo.value.foto2,
        this.recoInfo.value.foto3,
        this.recoInfo.value.foto4,
        this.recoInfo.value.solucion,
        this.recoInfo.value.firma,
        this.recoInfo.value.estado_ticket,
        this.recoInfo.value.nombre,
        this.recoInfo.value.Descripcion,
        this.recoInfo.value.num_folio,
        this.recoInfo.value.num_empleado,
        this.recoInfo.value.idstatusTicket

      );
    }
    this.obtenerTickets;
  }

  async saveTicket(

    idfolios: string | undefined | null,
    idusuarios: string | undefined | null,
    idtipo_servicio: string | undefined | null,
    asunto: string | undefined | null,
    mensaje: string | undefined | null,
    foto1: string | undefined | null,
    foto2: string | undefined | null,
    foto3: string | undefined | null,
    foto4: string | undefined | null,
    solucion: string | undefined | null,
    firma: string | undefined | null,
    estado_ticket: string | undefined | null,
    nombre: string | undefined | null,
    Descripcion: string | undefined | null,
    num_folio: string | undefined | null,
    num_empleado: string | undefined | null,
    idstatusTicket: string | undefined | null

  ) {
    console.log(
      "asunto", asunto,
      "descripcion", mensaje);
    let datosT = new insertTicket(
      idfolios,
      idusuarios,
      idtipo_servicio,
      asunto,
      mensaje,
      foto1,
      foto2,
      foto3,
      foto4,
      solucion,
      firma,
      estado_ticket,
      nombre,
      Descripcion,
      num_folio,
      num_empleado,
      idstatusTicket
    );
    console.log("Datos Ticket", datosT);
    this.customerService.saveTicket(datosT).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("VERRRRRRRRRRRRRREEEEEEEE", this.saveTicket);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.valido == 0) {
          console.log("next", respuestaDto.mensaje)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
        } else {
          this.ticke = <Ticket>respuestaDto.addenda;
          console.log("obtenerTickets", this.obtenerTickets);

          this.obtenerTickets();
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  confirmDelete() {
    this.deleteProductDialog = false;
    this.ticket = this.ticket.filter(val => val.idfolios !== this.products.idfolios);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    this.products = {};
  }
  
  /*
  async subirimg(event: any) {
    let conversion : ImagenesBase64<Imagen> = await this.convertB64(event);
    console.log("arrayimg", conversion.imagenes); //jalar las imagenes y ponerlas dentro del arreglo
    //this.arrayImagenes= conversion;
  
  }
  async  convertB64(event: any):  Promise<ImagenesBase64<Imagen>> {
    return new Promise((resolve, reject) => {
      var lista  :  ImagenesBase64<Imagen>[];
      
      let imagenes = event.files;
      let imagen;
        
      for (let key in  imagenes) {

          let reader = new FileReader();
          imagen = imagenes[key];
          reader.readAsDataURL(event.files[key]);
          reader.onload = (imagen) => {
          console.log("succes");
          lista.push({ imagenes : reader.result?.toString()});      }
          reader.onerror = function (error) {
            console.log('Error', error);
            reject(error);
          }
        
      }
      resolve({imagenes : lista});
    })
  }
  */
}
