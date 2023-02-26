import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoActivoComponent } from '../components/nuevo-activo/nuevo-activo.component';
import { PasoDosDetallePropComponent } from '../components/pasos-activo/paso-dos-detalle-prop/paso-dos-detalle-prop.component';
import { PasoUnoPropiedadComponent } from '../components/pasos-activo/paso-uno-propiedad/paso-uno-propiedad.component';

const routes: Routes = [
    {path: '', component: NuevoActivoComponent,
     children: [
    { path : 'pasounoActivo' , component:  PasoUnoPropiedadComponent}, 
    { path : 'pasodosActivo' , component:  PasoDosDetallePropComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepActivoRoutingModule { }
