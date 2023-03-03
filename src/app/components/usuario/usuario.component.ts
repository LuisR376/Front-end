import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import { Message, ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { Usuario } from '../model/usuario.model';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authGuardService } from '../../service/auth-guard.service';
import { RespuestaDto } from '../model/respuestaDto';
import { AlertaComponent } from 'src/app/util/alerta.component';
import { UsuarioService } from '../../service/usuario.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',

})
export class UsuarioComponent  {

}
