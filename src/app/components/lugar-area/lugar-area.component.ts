import { Component, ViewChild, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerService } from '../../service/CustomerService';
import { AreaService } from '../../service/Area.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lugarAreas } from '../model/lugarArea.model';
import { RespuestaDto } from '../model/respuestaDto';
import { authGuardService } from '../../service/auth-guard.service';
import { MessageService } from 'primeng/api';
import { AlertaComponent } from 'src/app/util/alerta.component';
import { insertArea } from '../model/insertArea'
import { Lugar } from '../model/lugar.model';

@Component({
  selector: 'app-lugar-area',
  templateUrl: './lugar-area.component.html',
  styleUrls: ['./lugar-area.component.css']
})
export class LugarAreaComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private customerService: CustomerService,
    public _authGuardService: authGuardService,
    private areaService: AreaService
  ) {
    this.token = this._authGuardService.getToken();

  }
  token: string;
  displayAddModal: boolean = false;
  area !: lugarAreas[];
  lugares !: Lugar[];
  areas !: any;
  text !: boolean;
  texts !: boolean;
  agregarAreaForm !: FormGroup;
 
  ngOnInit() {
    this.obtenerArea();
    this.obtenerLugar();
    this.FormArea();
  }
  FormArea() {
     this.agregarAreaForm = this.fb.group({
    nombre_area: ['', Validators.required],
    idlugar: ['', Validators.required]

  });
  }
  obtenerArea() {
    console.log("Token", this.token);
    this.customerService.getArea(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Obtener Area", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.area = resp.addenda;
        } else {

        } // if
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
  openNew() {
    this.displayAddModal = true;

  }
  closeModal() {
    this.agregarAreaForm.reset();
    this.obtenerArea();
    this.displayAddModal = false;
  }
  addArea() {
    console.log("Datos ingresados:", this.agregarAreaForm.value)
    if (this.agregarAreaForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'No es posible agregar', detail: 'Porfavor verifique todos los campos' });
    } {
      this.saveArea(this.agregarAreaForm.value);
    }
  }
  async saveArea(agregarAreaForm: lugarAreas) {
    console.log("datos del area", agregarAreaForm)
    this.areaService.saveArea(agregarAreaForm).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Respeusta", resp)
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.valido == 0) {

          this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Mensaje', detail: respuestaDto.mensaje });


          this.agregarAreaForm.reset();

        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
}
}
