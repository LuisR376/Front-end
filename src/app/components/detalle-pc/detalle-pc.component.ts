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
    private _ramService: ramService,
    private _detallePcService:detallePcService,
    private fb: FormBuilder
  ) {
    this.token = this._authGuardService.getToken();
  }
  token           : string;
  recoInfo!       :FormGroup;
  pc!             : detallePc[];
  ram             !:Ram[]
  discoDuro       !:discoDuro[];
  displayAddModal : boolean = false;
  displayAddModalDd : boolean = false;
  
  formulario(){
    this.recoInfo = this.fb.group({
      tipo_de_pc        : [''],
     
      num_serie         : ['', [Validators.required]],
      folio_compra      : ['', [Validators.required]],
     
      iddiscoduro       : ['', [Validators.required]],
     
    });
  }
  ngOnInit() {
    this.formulario();
    this.getdetallePc();
    this.ObtenerRam();
    this.ObtenerDD();
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
    console.log("Formulario", this.recoInfo.value)
    this.saveDetallepc(this.recoInfo.value);
    if (this.recoInfo.invalid) {
      this.messageService.add({ severity: 'error', summary: 'No es posible agregar', detail: 'Porfavor verifique todos los campos' });
    } else {
     
    }
  }
  saveDetallepc(recoInfo: detallePc) {
    this._detallePcService.saveDetallePc(this.recoInfo.value).subscribe(
      respuesta => {
        console.log('DetallePc guardado:', respuesta);
      
      },
      error => {
        console.error('Error al guardar activo:', error);
      }
    );
  }


}
