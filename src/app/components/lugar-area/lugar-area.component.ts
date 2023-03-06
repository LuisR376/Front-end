import { Component, ViewChild, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerService } from '../../service/CustomerService';
import { AreaService } from '../../service/Area.service';
import { FormBuilder, Validators } from '@angular/forms';
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
  @Input() displayAddModal: boolean = true;
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
  area !: lugarAreas[];
  lugares !: Lugar[];
  areas !: any;
  text !: boolean;
  texts !: boolean;

  productForm = this.fb.group({
    nombre_area: ['', Validators.required],
    idlugar: ['', Validators.required]
    
  });
  ngOnInit() {
    this.obtenerArea();
    this.obtenerLugar();
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
    this.areas = {};
    this.text = false;
    this.texts = true;
  }
    closeModal() {
      this.productForm.reset();
      this.obtenerArea();
    }
    addProduct() {
      console.log("this.loginFormLugare area",this.productForm.value)
      if(this.productForm.invalid){
        this.messageService.add({severity:'error', summary:'No es posible acceder', detail:'Porfavor verifique todos los campos'});
      }else{
        console.log("this.loginForm.value.usuarioLogin", this.productForm.value.nombre_area)
         this.saveArea( this.productForm.value.nombre_area, this.productForm.value.idlugar);
      }
    }
      async saveArea(nombre_area : string | undefined | null, idlugar : string | undefined | null) {
      console.log("lugarAreas", nombre_area, "Lugar", idlugar);
      let datosA = new insertArea(nombre_area, idlugar);
      console.log("Datos Area", datosA);
      this.areaService.saveArea(datosA).subscribe({
        next: (resp: RespuestaDto) => {

          let respuestaDto = <RespuestaDto>resp;
          if (respuestaDto.valido == 0) {
            console.log("next", respuestaDto.mensaje)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
          } else {
            this.areas = <lugarAreas>respuestaDto.addenda;
            this.obtenerArea();
          }
        },
        error: (error) => {
          let mensaje = <any>error;
          this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
        }   
      });    
  }
}
