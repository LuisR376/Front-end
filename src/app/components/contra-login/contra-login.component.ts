import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { authGuardService } from 'src/app/service/auth-guard.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-contra-login',
  templateUrl: './contra-login.component.html',
  styleUrls: ['./contra-login.component.css']
})
export class ContraLoginComponent {
constructor(
     private _formBuilder: FormBuilder,
     private messageService: MessageService,
     private _usuarioService: UsuarioService,
     public _authGuardService: authGuardService,
     private router: Router
) { }
    showInput         :boolean = false;
    showInputdos      :boolean = false;
  toggleInput() {
    this.showInput = !this.showInput;
  }
   toggleInputDos() {
    this.showInputdos = !this.showInputdos;
  }
}
