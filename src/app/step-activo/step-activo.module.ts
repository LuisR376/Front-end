import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepActivoRoutingModule } from './step-activo-routing.module';
import { NuevoActivoComponent } from '../components/nuevo-activo/nuevo-activo.component';
import { PasoUnoPropiedadComponent } from '../components/pasos-activo/paso-uno-propiedad/paso-uno-propiedad.component';
import { PasoDosDetallePropComponent } from '../components/pasos-activo/paso-dos-detalle-prop/paso-dos-detalle-prop.component';
import { StepsModule } from 'primeng/steps';
import {DialogModule} from 'primeng/dialog';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NuevoActivoComponent,
    PasoUnoPropiedadComponent,
    PasoDosDetallePropComponent,

  ],
  imports: [
    CommonModule,
    StepActivoRoutingModule,
    StepsModule,
    DialogModule
    
  ],exports : [
    NuevoActivoComponent,
    RouterModule
  ]
})
export class StepActivoModule { }
