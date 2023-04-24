import { Component, ViewChild, OnInit } from '@angular/core';
import { authGuardService } from 'src/app/service/auth-guard.service';
import { AlertaComponent } from 'src/app/util/alerta.component';
import { licenciaService } from '../../service/licencia.service';
import { RespuestaDto } from '../model/respuestaDto';
import { licencia } from '../model/licencia.model';

@Component({
  selector: 'app-licencia',
  templateUrl: './licencia.component.html',
  styleUrls: ['./licencia.component.css']
})
export class LicenciaComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  token: string;
  licencias !: licencia[];
  constructor(public _authGuardService: authGuardService,
  private _licenciaService : licenciaService) {
    this.token = this._authGuardService.getToken();
  }
  OnInit() {
    this.obtenerLicencias();
  }
  obtenerLicencias() {
    this._licenciaService.getLicencia(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Obtener Licencias", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.licencias = resp.addenda;
          console.log("this.licencias", this.licencias);
        } 
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
}