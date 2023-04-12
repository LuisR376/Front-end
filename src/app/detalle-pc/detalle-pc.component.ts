import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from "primeng/api";
import { authGuardService } from "src/app/service/auth-guard.service";


import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertaComponent } from 'src/app/util/alerta.component';
import { CustomerService } from '../service/CustomerService';
import { detallePc } from '../components/model/detallePc.model';
import { RespuestaDto } from '../components/model/respuestaDto';

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
    private fb: FormBuilder
  ) {
    this.token = this._authGuardService.getToken();
  }
  token           : string;
  recoInfo!       :FormGroup;
  pc!             : detallePc[];
  displayAddModal : boolean = false;
  displayAddModalDd : boolean = false;
  
  formulario(){
    this.recoInfo = this.fb.group({
      tipo_de_pc        : ['', [Validators.required]],
      modelo            : ['', [Validators.required]],
      num_serie         : ['', [Validators.required]],
      folio_compra      : ['', [Validators.required]],
      procesador        : ['', [Validators.required]],
      iddiscoduro       : ['', [Validators.required]],
      idram             : ['', [Validators.required]],
      marca             : ['', [Validators.required]],
      Sistema_Operativo : ['', [Validators.required]],
      idioma            : ['', [Validators.required]]
    });
  }
  ngOnInit() {
    this.getdetallePc();
  }
  openNew() {
    let displayAddModal : boolean = true;
    if (displayAddModal == true) {
      displayAddModal == true;
    }else{
    let  displayAddModalDd : boolean = true;
    displayAddModalDd == true;
    }

  }

  closeModal() {
    this.displayAddModal = false;
  }
  getdetallePc() {
    console.log("Token", this.token);
    this.customerService.getArea(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Obtener DetallePc", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.pc = resp.addenda;
        } else {

        } // if
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }


}
