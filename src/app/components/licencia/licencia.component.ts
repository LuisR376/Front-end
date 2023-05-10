import { Component, ViewChild, OnInit } from '@angular/core';
import { authGuardService } from 'src/app/service/auth-guard.service';
import { AlertaComponent } from 'src/app/util/alerta.component';
import { licenciaService } from '../../service/licencia.service';
import { RespuestaDto } from '../model/respuestaDto';
import { licencia } from '../model/licencia.model';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table'

@Component({
  selector: 'app-licencia',
  templateUrl: './licencia.component.html',
  styleUrls: ['./licencia.component.css']
})
export class LicenciaComponent {
  @ViewChild('dt', { static: false }) table!: Table
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  opcionesFormato = [{ label: 'Digital', value: 'Digital' },
  { label: 'Impreso', value: 'Impreso' },
  { label: 'Tarjeta plástica', value: 'Tarjeta plástica' }];
  token: string;
  licencias !: licencia[];
  licen !: licencia;
  clonedlicencias: { [s: string]: licencia } = {};
  licenciaSeleccionada !: licencia;
  infoForm    !: FormGroup;
  elemenLicenciaSelected = new Array();
  visibleNumLicencia !: boolean;
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
      idLicencias: [''],
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
        }
      },
      error: (error) => {
        let mensaje = <any>error;
        this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
      }
    });
  }
  onRowEditInit(lic: licencia, index: number, htmlTableRowElement: any) {
    this.clonedlicencias[lic.idLicencias] = { ...lic };
    this.licenciaSeleccionada = this.clonedlicencias[lic.idLicencias];

    if (this.elemenLicenciaSelected.length > 0) {
      let objetoLicencia = this.elemenLicenciaSelected[this.elemenLicenciaSelected.length - 1];
      this.table.saveRowEdit(objetoLicencia.licencia, htmlTableRowElement)
    }
    this.setteaFormulario(this.licenciaSeleccionada, lic, index, htmlTableRowElement);

  }

  setteaFormulario(licenciaSelected: licencia, lic: licencia, index: number, htmlTableRowElement: any) {
    this.elemenLicenciaSelected.push({ licencia: lic, htmlTableRowElement });
    this.infoForm.patchValue({
      idLicencias: licenciaSelected.idLicencias,
      numserie_licencia: licenciaSelected.numserie_licencia,
      tipo_licencia: licenciaSelected.tipo_licencia,
      nombre: licenciaSelected.nombre,
      folio_compra: licenciaSelected.folio_compra,
      formato: licenciaSelected.formato,
      descripcion: licenciaSelected.descripcion
    });
  }
  onRowEditCancel(lic: licencia, index: number) {
    this.licencias[index] = this.clonedlicencias[lic.idLicencias];
    delete this.clonedlicencias[lic.idLicencias];
  }

  prueba(rowData: any, htmlTableRowElement: any) {
    this.table.saveRowEdit(rowData, htmlTableRowElement)
  }
  async onRowEditSave(info: licencia) {
    console.log("***edit infoForm", this.infoForm.value);
    // Llamar a la función updateLincencia de licenciaService y pasarle el objeto de licencias actualizado
    this._licenciaService.updateLincencia(this.infoForm.value).subscribe({
      next: (resp: RespuestaDto) => {
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.valido == 0) {
          console.log("next", respuestaDto.mensaje)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: respuestaDto.mensaje });
        } else {
          this.licen = <licencia>respuestaDto.addenda;
          this.messageService.add({ severity: 'success', summary: 'Muy bien! se ha guardado correctamente', detail: respuestaDto.mensaje });

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


  deleteLicencia(licencia: licencia){
    this._licenciaService.deleteLicencia(licencia).subscribe({
      next: (resp: RespuestaDto) => {
        console.log("Obtener Licencias", resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
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