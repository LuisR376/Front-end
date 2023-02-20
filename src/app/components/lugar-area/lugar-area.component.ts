import { Component,ViewChild} from '@angular/core';
import { CustomerService } from '../../service/CustomerService';
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
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  token : string;
  area !: lugarAreas[];
areas !: any;
text !: boolean;
texts !: boolean;
  constructor(
    private messageService: MessageService,
    private customerService: CustomerService,
    public _authGuardService: authGuardService,
    
    ) {
      this.token = this._authGuardService.getToken();

    }
  ngOnInit() {
    this.obtenerArea();
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
}
