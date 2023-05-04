import { Component, ViewChild, OnInit } from '@angular/core';
import { authGuardService } from 'src/app/service/auth-guard.service';
import { AlertaComponent } from 'src/app/util/alerta.component';
import { licenciaService } from '../../service/licencia.service';
import { RespuestaDto } from '../model/respuestaDto';
import { licencia } from '../model/licencia.model';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-licencia',
  templateUrl: './licencia.component.html',
  styleUrls: ['./licencia.component.css']
})
export class LicenciaComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  token: string;
  licencias !: licencia[];
  licen !: licencia;
  clonedlicencias: { [s: string]: licencia } = {};
  infoForm    !: FormGroup;

  constructor(
    private fb: FormBuilder,
    public _authGuardService: authGuardService,
    private _licenciaService: licenciaService,
    private messageService: MessageService
  ) {
    this.token = this._authGuardService.getToken();
  }
  ngOnInit() {
    this.obtenerLicencias();
    this.formulario();
  }
  formulario() {
    this.infoForm = this.fb.group({
      numserie_licencia: ['', Validators.required],
      tipo_licencia: ['', Validators.required],
      nombre: ['', Validators.required],
      folio_compra: ['', Validators.required],
      formato: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
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
  onRowEditInit(lic: licencia) {
    this.clonedlicencias[lic.idLicencias] = { ...lic };
    console.log("this.clonedlicencias", this.clonedlicencias);

  }
  onRowEditCancel(lic: licencia, index: number) {
    this.licencias[index] = this.clonedlicencias[lic.idLicencias];
    delete this.clonedlicencias[lic.idLicencias];
  }
async onRowEditSave(info: licencia) {
  console.log("***edit",this.infoForm);
  if (parseInt(info.folio_compra) > 0) {
    delete this.clonedlicencias[info.idLicencias];
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
  } else {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid folio_compra' });
    return;
  }

  // Llamar a la función updateLincencia de licenciaService y pasarle el objeto de licencias actualizado
  this._licenciaService.updateLincencia(this.licencias[0]).subscribe({
    next: (resp: RespuestaDto) => {
      let respuestaDto = <RespuestaDto>resp;
      if (respuestaDto.valido == 0) {
        console.log("next", respuestaDto.mensaje)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
      } else {
        this.licen = <licencia>respuestaDto.addenda;

        // Llamar a la función obtenerLicencias para mostrar los datos actualizados
        this.obtenerLicencias();
      }
    },
    error: (error) => {
      let mensaje = <any>error;
      this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
    }
  });
}

}