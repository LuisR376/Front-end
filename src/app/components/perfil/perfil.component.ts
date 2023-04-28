import { Component } from '@angular/core';
import { authGuardService } from 'src/app/service/auth-guard.service';
import { Usuario } from '../model/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  sesionUsuario !: Usuario;
  constructor(
    public _authGuardService: authGuardService
    ) {
      this.sesionUsuario = this._authGuardService.getUser();
    }
}
