import { Component,OnInit,ViewChild } from '@angular/core';

import { authGuardService } from 'src/app/service/auth-guard.service';
import { RespuestaDto } from '../model/respuestaDto';
import { Activos } from '../model/activos.model';
import { AlertaComponent } from 'src/app/util/alerta.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivosService } from 'src/app/service/Activos.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  constructor(
    public _ActivosService:ActivosService,
    public _authGuardService: authGuardService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.token = this._authGuardService.getToken();
  }
  token: string;
  activos !: Activos[];
  ngOnInit() {
    this.obtenerActivos()
     const id = this.activatedRoute.snapshot.paramMap.get('id');
  }
  obtenerActivos() {
    console.log("Token", this.token);
    this._ActivosService.getActivos(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Obtener Activos", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.activos = resp.addenda;
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
}
