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
import { ticketService } from 'src/app/service/ticket.service';


@Component({
  selector: 'app-table-ticket',
  templateUrl: './table-ticket.component.html',
  styleUrls: ['./table-ticket.component.css']
})
export class TableTicketComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  @Input() displayAddModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  products : Ticket = {};
  token: string;
  ticket: Ticket[] = [];
  tickets !: Ticket[];
  sesionUsuario !: Usuario;
  text !: boolean;
  texts !: boolean;
  ticke: any;

  deleteProductDialog: boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private customerService: CustomerService,
    public _authGuardService: authGuardService,
    private ticketservice: ticketService
  ) {
    this.token = this._authGuardService.getToken();
    this.sesionUsuario = this._authGuardService.getUser();
  }
  confirmDelete() {
    this.deleteProductDialog = false;
    this.ticket = this.ticket.filter(val => val.idfolios !== this.products.idfolios);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    this.products = {};
  }

  recoInfo = this.fb.group({


    idfolios: ['', Validators.required],
    idusuarios: ['', Validators.required],
    idtipo_servicio: ['', Validators.required],
    asunto: ['', Validators.required],
    mensaje: ['', Validators.required],
    foto1: ['', Validators.required],
    foto2: ['', Validators.required],
    foto3: ['', Validators.required],
    foto4: ['', Validators.required],
    solucion: ['', Validators.required],
    firma: ['', Validators.required],
    estado_ticket: ['', Validators.required],
    nombre: ['', Validators.required],
    Descripcion: ['', Validators.required],
    num_folio: ['', Validators.required],
    num_empleado: ['', Validators.required],
    idstatusTicket: ['', Validators.required]


  });

  ngOnInit() {
    debugger
    console.log("entraa")
    this.obtenerTickets();

  }

  openNew() {
    this.ticke = {};
    this.text = false;
    this.texts = true;
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
      "descripcion", Descripcion);
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
    this.ticketservice.saveTicket(datosT).subscribe({
      next: (resp: RespuestaDto) => {

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
  

}
