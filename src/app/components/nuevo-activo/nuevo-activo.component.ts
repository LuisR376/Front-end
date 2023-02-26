import { Component, Input, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-nuevo-activo',
  templateUrl: './nuevo-activo.component.html',
  styleUrls: ['./nuevo-activo.component.css']
})
export class NuevoActivoComponent  implements OnInit{
  nuevoActivoComp : boolean = false;

  pasosActivo!: MenuItem[];
 
 ngOnInit(){
  this.pasosActivo = [
    {
      label: 'Paso 1',
      routerLink: '/steps/pasounoActivo'
    
    },
    {label: 'Paso 2',
    routerLink: '/home/inicio/pasodosActivo'
   },
    {label: 'Paso3 3'},
    {label: 'Paso3 4'},
    {label: 'Paso3 5'},
    {label: 'Paso3 6'}
];
 }


  guardarActivo(){
    this.nuevoActivoComp =  false;
  }

  abrirModalNuevoAct(accion : boolean){
      this.nuevoActivoComp = accion;
  }
}
