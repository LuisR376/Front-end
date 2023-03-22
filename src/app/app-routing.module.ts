import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './components/indexPrincipal/principal.component';
const routes: Routes = [
  { path: '', component: PrincipalComponent ,
  children: [{
    path: '',
    component: LoginComponent,
  }]},

  {
    path: 'home',
    component: AppComponent, // se agrega para jalar los componentes de layout (hace la misma funcion que app.N)
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('./main/main.module').then(x => x.MainModule)
      },
     
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
