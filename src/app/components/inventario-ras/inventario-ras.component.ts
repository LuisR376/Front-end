import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivosService } from 'src/app/service/Activos.service';
import { authGuardService } from 'src/app/service/auth-guard.service';
import { RespuestaDto } from '../model/respuestaDto';
import { AlertaComponent } from 'src/app/util/alerta.component';
import { Activos } from '../model/activos.model';
@Component({
  selector: 'app-inventario-ras',
  templateUrl: './inventario-ras.component.html',
  styleUrls: ['./inventario-ras.component.css']
})
export class InventarioRASComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  constructor(
    public _authGuardService: authGuardService,
    private route: ActivatedRoute,
    public _ActivosService: ActivosService,
  ) {
    this.token = this._authGuardService.getToken();
    this.idactivos = this.route.snapshot.paramMap.get('idactivos') as any;
    console.log(this.idactivos);
  }
  token: string;
  idactivoss!: Activos [];
  idactivos !: string;
  ngOnInit() {
    this.obtenerActivos(this.idactivos);
  }
    obtenerActivos(idactivos :string) {
      console.log("Token", this.token);
      console.log("AQUI ESTA CORRECTO", this.idactivos);
    this._ActivosService.getActivosByid(this.token, idactivos).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Obtener Activos", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.idactivos = resp.addenda;
          console.log("AQUI SE ESTA CORROMPIENDO", this.idactivos);
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
    }
   
}
