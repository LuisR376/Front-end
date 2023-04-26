import { Component, ViewChild } from '@angular/core';
import { authGuardService } from 'src/app/service/auth-guard.service';
import { AlertaComponent } from 'src/app/util/alerta.component';
import { RespuestaDto } from '../model/respuestaDto';
import { licenciaService } from 'src/app/service/licencia.service';
import { licencia } from '../model/licencia.model';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { insertLicencia } from '../model/insertLicencia';
import { Router,} from '@angular/router';
@Component({
  selector: 'app-nuevalicencia',
  templateUrl: './nuevalicencia.component.html',
  styleUrls: ['./nuevalicencia.component.css']
})

export class NuevalicenciaComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  token        : string;
  licencias   !: licencia[];
  
  license: any;
    opciones = [  { label: 'Digital', value: 'Digital' },
      { label: 'Impreso', value: 'Impreso' },
    { label: 'Tarjeta plástica', value: 'Tarjeta plástica' }];
  constructor(
    public _authGuardService: authGuardService,
    private _licenciaService: licenciaService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.token = this._authGuardService.getToken();
  }
   userInput = this.fb.group({
      numserie_licencia : ['', [Validators.required]],
      tipo_licencia     : ['', [Validators.required]],
      nombre            : ['', [Validators.required]],
      folio_compra      : ['', [Validators.required]],
      formato           : ['', [Validators.required]],
      descripcion       : ['', [Validators.required]]
    });
  ngOnInit() {
    this.obtenerLicencias();
  }
  obtenerLicencias() {
    this._licenciaService.getLicencia(this.token).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Obtener Licencias", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.licencias = resp.addenda;
          console.log("this.licencias", this.licencias);
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
 
  
 addLicencia() {
    console.log("this.userInput", this.userInput.value);
    
    if (this.userInput.invalid) {
      this.messageService.add({ severity: 'error', summary: 'No es posible acceder', detail: 'Porfavor verifique todos los campos' });
    } else {
      console.log("this.recolecta informacion", this.userInput.value)
      this.saveLincencia(this.userInput.value.numserie_licencia,this.userInput.value.tipo_licencia,this.userInput.value.nombre,this.userInput.value.folio_compra,this.userInput.value.formato,this.userInput.value.descripcion
      );
    }
 }
  async saveLincencia(numserie_licencia: string | undefined | null,
        tipo_licencia: string | undefined | null,
        nombre: string | undefined | null,
        folio_compra: string | undefined | null,
        formato: string | undefined | null,
        descripcion: string | undefined | null) {
    let datosA = new insertLicencia(
        numserie_licencia,
        tipo_licencia,
        nombre,
        folio_compra,
        formato,
        descripcion
    );
    this._licenciaService.saveLincencia(datosA).subscribe({
      next: (resp: RespuestaDto) => {

        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.valido == 0) {
          console.log("next", respuestaDto.mensaje)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
        } else {
          this.license = <licencia>respuestaDto.addenda;
          console.log("obtenerLicencias",this.obtenerLicencias);
          
          this.obtenerLicencias();
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });

  }
  Cancelar() {
    this.userInput.reset();
   this.router.navigate(['/home/inicio/main/licencia']);
  }
}
