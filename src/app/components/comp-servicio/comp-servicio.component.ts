import { Component, ViewChild } from '@angular/core';
import { servicioService } from 'src/app/service/Servicio.service';
import { AlertaComponent } from 'src/app/util/alerta.component';
import { RespuestaDto } from '../model/respuestaDto';
import { authGuardService } from 'src/app/service/auth-guard.service';
import { Servicios } from '../model/servicios.model';
import { ticketService } from 'src/app/service/ticket.service';
import { Ticket } from '../model/ticket.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/service/CustomerService';
import { Lugar } from '../model/lugar.model';
import { Activos } from '../model/activos.model';
import { tipodeservicioService } from 'src/app/service/tipodeservicio.service';
import { insertServicio } from '../model/insertSevicio';
import { tipodeservicio } from '../model/tipodeservicio.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivosService } from 'src/app/service/Activos.service';
import { lugarAreas } from '../model/lugarArea.model';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-comp-servicio',
  templateUrl: './comp-servicio.component.html',
  styleUrls: ['./comp-servicio.component.css']
})
export class CompServicioComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  
  constructor(
    public _servicioService:servicioService,
    public _authGuardService: authGuardService,
    public _ticketService:ticketService,
    private route: ActivatedRoute, 
    public _ActivosService:ActivosService,
    public customerService:CustomerService,
    public _tipodeservicioService:tipodeservicioService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
  ){
    this.token = this._authGuardService.getToken();
    this.idfolios = this.route.snapshot.paramMap.get('idfolio') as any;
    console.log(this.idfolios);
    this.num_folio = this.route.snapshot.paramMap.get('descFolio') as any;
    console.log(this.num_folio);
    this.idLugar = this.route.snapshot.paramMap.get('idlugar') as any;
    console.log(this.idLugar);
  }
  token: string;
  servicios !: Servicios[];
  num_folio!: string;
  idfolios!: string;
  idLugar!:string;
  resp!:Lugar;
  lugares!:Lugar[];
  activos!:Activos;
  tiposervicio!:tipodeservicio[];
  num_inventario!:ActivosService[];
  recoInfo!: FormGroup;
  servicio!: Servicios;
  ngOnInit() {
    this.obtenerServicio();
    this.obtenerLugar();
    this.obtenerActivos();
    this.formulario();
    this.obtenerTipodeServicio();
  }
  formulario(){
    this.recoInfo = this.fb.group({
      idfolios        : [this.idfolios],
      idtipo_servicio : ['', [Validators.required]],
      descripcion     : ['', [Validators.required]],
      observaciones   : ['', [Validators.required]],
      idactivos       : ['', [Validators.required]],
      idlugar          : ['', [Validators.required]]
      
    });
  }
  obtenerServicio() {
    this._servicioService.fnservicios(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Obtener Servicios", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.servicios = resp.addenda;
          console.log("this.Servicios", this.servicios);
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  
  obtenerLugar() {
    console.log("Token", this.token);
    this.customerService.getLugar(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Lugaaaaaaaaaaaaar", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.lugares = resp.addenda;
        } else {

        } // if
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  
  obtenerActivos() {
    console.log("Token", this.token);
    this._ActivosService.getActivoNumInventario(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Obtener Activos", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.num_inventario = resp.addenda;
          console.log("this.num_inventario", this.num_inventario);
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
    this._tipodeservicioService.getServicioaddi(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("servicios", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.tiposervicio = resp.addenda;
        }
        console.log("this.tiposervicio", this.tiposervicio);

      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
   addService() {
    
      this._servicioService.saveServicio(this.recoInfo.value).subscribe({
        next: (resp: RespuestaDto) => {
          let respuestaDto = <RespuestaDto>resp;
          
          if (respuestaDto.valido == 0) {
            console.log("next", respuestaDto.mensaje)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
          } else {
            this.servicio = <Servicios>respuestaDto.addenda;
            this.messageService.add({ severity: 'success', summary: 'Muy bien! se ha guardado correctamente', detail: respuestaDto.mensaje });
          }
        },
        error: (error) => {
          let mensaje = <any>error;
          this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
        }
      });
      this.recoInfo.reset();
    }
  Cancelar() {
    this.recoInfo.reset();
    this.router.navigate(['/home/inicio/main/solicitud']);
  }
}
