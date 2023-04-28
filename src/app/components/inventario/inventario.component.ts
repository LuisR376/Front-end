import { Component,ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/service/CustomerService';
import { authGuardService } from 'src/app/service/auth-guard.service';
import { RespuestaDto } from '../model/respuestaDto';
import { Activos } from '../model/activos.model';
import { AlertaComponent } from 'src/app/util/alerta.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  constructor(
    private customerService: CustomerService,
    public _authGuardService: authGuardService,
    private router: Router
  ) {
    this.token = this._authGuardService.getToken();
  }
  token: string;
  activos !: Activos[];
  ngOnInit() {
    this.obtenerActivos()
  }
  obtenerActivos() {
    console.log("Token", this.token);
    this.customerService.getActivos(this.token).subscribe({
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
  Imprimir() {
   this.router.navigate(['/home/inicio/main/inventarioRas/:id']);
  }
}
