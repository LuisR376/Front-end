import { Component,ViewChild,EventEmitter,Input, OnInit, Output} from '@angular/core';
import { CustomerService } from '../../service/CustomerService';
import { AreaService } from '../../service/Area.service';
import { FormBuilder, Validators } from '@angular/forms';
import { lugarAreas } from '../model/lugarArea.model';
import { RespuestaDto } from '../model/respuestaDto';
import { authGuardService } from '../../service/auth-guard.service';
import { MessageService } from 'primeng/api';
import { AlertaComponent } from 'src/app/util/alerta.component';

@Component({
  selector: 'app-lugar-area',
  templateUrl: './lugar-area.component.html',
  styleUrls: ['./lugar-area.component.css']
})
export class LugarAreaComponent {
  @Input() displayAddModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  token : string;
  area !: lugarAreas[];
areas !: any;
text !: boolean;
texts !: boolean;
idlugar! : any[];
productForm = this.fb.group({
  nombre_area: ["", Validators.required],
  idlugar: ["", Validators.required]
});
  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private customerService: CustomerService,
    public _authGuardService: authGuardService,
    private areaService: AreaService
    ) {
      this.token = this._authGuardService.getToken();

    }
  ngOnInit() {
    this.obtenerArea();
    this.idlugar = [
      {label: '1', value: '1'},
      {label: '2', value: '2'},
      {label: '3', value: '3'}
  ];
  }
  obtenerArea(){
  console.log("Token",this.token);
    this.customerService.getArea(this.token).subscribe({
      next : (resp: RespuestaDto)  => {
        console.log("Obtener Area",resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.area = resp.addenda;
        } else {

        } // if
      },
        error : (error) => {
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
  this.areas.reset();
  this.clickClose.emit(true);
}
addProduct() {
  this.areaService.saveArea(this.areas.value).subscribe(
    response => {
      this.clickAdd.emit(response);
      this.closeModal();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added' });
    },
    error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      console.log('Errror occured');
    }
  )
}
}
