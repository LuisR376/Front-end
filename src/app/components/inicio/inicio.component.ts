import { Component,OnInit, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Usuario } from '../model/usuario.model';
import { AlertaComponent } from '../../util/alerta.component';
import { authGuardService } from '../../service/auth-guard.service';
import { UsuarioService } from '../../service/usuario.service';


@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
})
export class InicioComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  items!: MenuItem[];
  token : string;
  usuarios !: Usuario[];
  sesionUsuario !: Usuario;
  constructor(

    public _authGuardService: authGuardService,
    private authService: UsuarioService,
    public _auth: authGuardService
    
    ) {
      this.token = this._authGuardService.getToken();
      this.sesionUsuario = this._authGuardService.getUser();

    }

  get auth(){
    return this.authService.auth;
    
  }
  ngOnInit() {
      this.items = [
        
          {label: 'Perfil', icon: 'pi pi-user', routerLink: ['perfil'] },
          {separator:true},
          {label: 'Exit', icon: 'pi pi-sign-out' , command: () => this.logout() , routerLink: [''] }
          
      ];
  }
  logout() {
    
    this._auth.logout()
  }

}

