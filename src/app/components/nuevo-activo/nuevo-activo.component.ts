import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from "primeng/api";
import { authGuardService } from "src/app/service/auth-guard.service";
import { CustomerService } from '../../service/CustomerService';
import { Activos } from '../model/activos.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tipoactivo } from '../model/tipoactivo.model';
import { RespuestaDto } from '../model/respuestaDto';
import { AlertaComponent } from 'src/app/util/alerta.component';

@Component({
  selector: 'app-nuevo-activo',
  templateUrl: './nuevo-activo.component.html',
  styleUrls: ['./nuevo-activo.component.css']
})
export class NuevoActivoComponent implements OnInit {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  constructor(
    private messageService: MessageService,
    public _authGuardService: authGuardService,
    public ticketService: CustomerService,
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {
    this.token = this._authGuardService.getToken();
  }
  token: string;
  activoInformacion!: MenuItem[];
  tablaActivos !: Activos;
  tipo_activo_desc !: tipoactivo[];
  pertenencia!: any[];
  opciones = [  { label: 'Empresa', value: 'Empresa' },
              { label: 'Personal', value: 'Personal' }];
  items = [
    { label: 'Tipo de Activo' },
    { label: 'Datos del cliente' },
    { label: 'Ubicacion' },
    { label: 'Datos del Equipo' },
    { label: 'Accesorio' }
  ];
  activeIndex = 0;
  step1Form!: FormGroup;
  step2Form!: FormGroup;
  step3Form!: FormGroup;
  step4Form!: FormGroup;
  step5Form!: FormGroup;


  ngOnInit() {
    this.step1Form = this.fb.group({
      tipo_activo_desc: ['', [Validators.required]],
      pertenencia: ['', [Validators.required]]
    });

    this.step2Form = this.fb.group({
      nombre_propietario: ['', [Validators.required]],
      num_empleado: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.step3Form = this.fb.group({
      idlugar: ['', [Validators.required]],
      idarea: ['', [Validators.required]]
    });

    this.step4Form = this.fb.group({
      nombre_equipo: ['', [Validators.required]],
      valor_monetario: ['', [Validators.required]]
    });

    this.step5Form = this.fb.group({
      descripcion: ['', [Validators.required]]
    });
  }
  onActiveIndexChange(event: any) {
    console.log('Nuevo índice activo:', event.index);
  }
  obtenertipoActivo() {
    console.log("Token", this.token);
    this.customerService.getLugar(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("TipoActivo", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.tipo_activo_desc = resp.addenda;
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
