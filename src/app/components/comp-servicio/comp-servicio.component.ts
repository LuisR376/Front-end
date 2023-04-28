import { Component, ViewChild } from '@angular/core';
import { servicioService } from 'src/app/service/Servicio.service';
import { AlertaComponent } from 'src/app/util/alerta.component';
import { RespuestaDto } from '../model/respuestaDto';
import { authGuardService } from 'src/app/service/auth-guard.service';
import { Servicios } from '../model/servicios.model';

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
  ){
    this.token = this._authGuardService.getToken();
  }
  token: string;
  servicios !: Servicios[];
  ngOnInit() {
    this.obtenerServicio();
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
}
