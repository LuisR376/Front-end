import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from "primeng/api";
import { authGuardService } from "src/app/service/auth-guard.service";
import { CustomerService } from '../../service/CustomerService';
import { Activos } from '../model/activos.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-activo',
  templateUrl: './nuevo-activo.component.html',
  styleUrls: ['./nuevo-activo.component.css']
})
export class NuevoActivoComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    public _authGuardService: authGuardService,
    public ticketService: CustomerService,
    private fb: FormBuilder
  ) {

  }
  activoInformacion!: MenuItem[];
  tablaActivos !: Activos;
  items = [
    { label: 'Tipo de Activo' },
    { label: 'Datos del cliente' },
    { label: 'Ubicacion' },
    { label: 'Datos del Equipo' },
    { label: 'Accesorio' }
  ];
  activeIndex = 0;
  step1Form!: FormGroup;
  step2Form!: FormGroup;
  step3Form!: FormGroup;
  step4Form!: FormGroup;
  step5Form!: FormGroup;


  ngOnInit(): void {
    this.step1Form = this.fb.group({
      pertenencias: ['', [Validators.required]],
      idtipoactivo: ['', [Validators.required, Validators.email]]
    });

    this.step2Form = this.fb.group({
      nombre_propietario: ['', [Validators.required]],
      num_empleado: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.step3Form = this.fb.group({
      idlugar: ['', [Validators.required]],
      idarea: ['', [Validators.required]]
    });

    this.step4Form = this.fb.group({
      nombre_equipo: ['', [Validators.required]],
      valor_monetario: ['', [Validators.required]]
    });

    this.step5Form = this.fb.group({
      descripcion: ['', [Validators.required]]
    });
  }
  onActiveIndexChange(event: any) {

  }
}
