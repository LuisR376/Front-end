import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from "primeng/api";
import { authGuardService } from "src/app/service/auth-guard.service";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AlertaComponent } from 'src/app/util/alerta.component';
import { CustomerService } from '../../service/CustomerService';
import { detallePc } from '../model/detallePc.model';
import { RespuestaDto } from '../model/respuestaDto';
import { dicoDservice } from 'src/app/service/discoDuro.service';
import { ramService } from 'src/app/service/ram.service';
import { Ram } from '../model/ram.model';
import { discoDuro } from '../model/discoDuro.model';
import { detallePcService } from 'src/app/service/detallePc.service';
import { EquiposService } from 'src/app/service/equipos.service';
import { Equipos } from '../model/equipos.model';

@Component({
  selector: 'app-detalle-pc',
  templateUrl: './detalle-pc.component.html',
  styleUrls: ['./detalle-pc.component.css']
})
export class DetallePcComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  constructor(
    private messageService: MessageService,
    public _authGuardService: authGuardService,
    private customerService: CustomerService,
    private _dicoDservice:dicoDservice,
    private  _equiposService: EquiposService,
    private _ramService: ramService,
    private _detallePcService:detallePcService,
    private fb: FormBuilder
  ) {
    this.token = this._authGuardService.getToken();
  }
  token           : string;
  recoInfo!       :FormGroup;
  recoInfoRam!    :FormGroup;
  recoInfoDD!     :FormGroup;
  equipos          !: Equipos[];
  pc!             : detallePc[];
  pcdetalle!             : detallePc;
  ram             !:Ram[];
  ramsave             !:Ram;
  discoDuro       !:discoDuro[];
  displayAddModal : boolean = false;
  displayAddModalDd : boolean = false;
  
  formulario(){
    this.recoInfo = this.fb.group({
      tipo_de_pc        : [''],
      modelo            : ['', [Validators.required]],
      num_serie         : ['', [Validators.required]],
      folio_compra      : ['', [Validators.required]],
      procesador        : ['', [Validators.required]],
      marca             : ['', [Validators.required]],
      Sistema_Operativo : ['', [Validators.required]],
      idioma            : ['', [Validators.required]],
      iddiscoduro       : ['', [Validators.required]],
      idram             : ['', [Validators.required]]
    });
  }
  formularioRam(){
    this.recoInfoRam = this.fb.group({
      nombre      : ['', [Validators.required]],
      capacidad   : ['', [Validators.required]],
      marca      : ['', [Validators.required]]
    });
  }
  formularioDD(){
    this.recoInfoDD = this.fb.group({
      cap_almacenamiento  : ['', [Validators.required]],
      tecnologia_M_S      : ['', [Validators.required]],
      marca               : ['', [Validators.required]]
    });
  }
  ngOnInit() {
    this.formulario();
    this.formularioRam();
    this.formularioDD();
    this.getdetallePc();
    this.ObtenerRam();
    this.ObtenerDD();
    this.getEquipos();
  }
  openNew(modal: string) {
    if (modal === 'ram') {
      this.displayAddModal = true;
    } else if (modal === 'Dd') {
      this.displayAddModalDd = true;
    } else {
      console.log('Modal no encontrado');
    }
  }

  closeModal() {
    this.displayAddModal = false;
  }
  getdetallePc() {
    console.log("Token", this.token);
    this.customerService.getDetallePc(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Obtener DetallePc", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.pc = resp.addenda;
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  ObtenerRam() {
    console.log("Token", this.token);
    this._ramService.getRam(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Obtener Ram", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.ram = resp.addenda;
          var concatLabel = '';
          for(let key in this.ram){
            var concatLabel = '';
                    concatLabel =  this.ram[key].nombre+ '-' + this.ram[key].capacidad + '-' + this.ram[key].marca;
                    this.ram[key].nombre = concatLabel;
          }
          console.log("this.ram", this.ram);
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  ObtenerDD() {
    console.log("Token", this.token);
    this._dicoDservice.getDD(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Obtener DiscD", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.discoDuro = resp.addenda;
          var concatLabel = '';
          for(let key in this.discoDuro){
            var concatLabel = '';
                    concatLabel =  this.discoDuro[key].cap_almacenamiento+ '-' + this.discoDuro[key].tecnologia_M_S + '-' + this.discoDuro[key].marca;
                    this.discoDuro[key].marca = concatLabel;
          }
          console.log("this.discoDuro", this.discoDuro);
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
 
  addDetalePc() {
    
      this._detallePcService.saveDetallePc(this.recoInfo.value).subscribe({
        next: (resp: RespuestaDto) => {
          let respuestaDto = <RespuestaDto>resp;
          
          if (respuestaDto.valido == 0) {
            console.log("next", respuestaDto.mensaje)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
          } else {
            this.pcdetalle = <detallePc>respuestaDto.addenda;
            this.messageService.add({ severity: 'success', summary: 'Muy bien! se ha guardado correctamente', detail: respuestaDto.mensaje });
          }
        },
        error: (error) => {
          let mensaje = <any>error;
          this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
        }
      });
    }
  addRam(recoInfoRam  : Ram) {
    this._ramService.saveRam(this.recoInfoRam.value).subscribe({
      next: (resp: RespuestaDto) => {
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.valido == 0) {
          console.log("next", respuestaDto.mensaje)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
        } else {
          this.ramsave = <Ram>respuestaDto.addenda;
          this.messageService.add({ severity: 'success', summary: 'Muy bien! se ha guardado correctamente', detail: respuestaDto.mensaje });
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
      addDiscoDuro() {
        this._dicoDservice.saveDD(this.recoInfoDD.value).subscribe({
          next: (resp: RespuestaDto) => {
            let respuestaDto = <RespuestaDto>resp;
            if (respuestaDto.valido == 0) {
              console.log("next", respuestaDto.mensaje)
              this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
            } else {
              this.ramsave = <Ram>respuestaDto.addenda;
              this.messageService.add({ severity: 'success', summary: 'Muy bien! se ha guardado correctamente', detail: respuestaDto.mensaje });
            }
          },
          error: (error) => {
            let mensaje = <any>error;
            this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
          }
        });
      }



      getEquipos(){
        this._equiposService.getEquipos(this.token).subscribe({
          next: (resp: RespuestaDto) => {
            let respuestaDto = <RespuestaDto>resp;
            this.equipos =respuestaDto.addenda;
            
          },
          error: (error : any) => {
            let mensaje = <any>error;
            this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
          }
        });
      }
}

  


