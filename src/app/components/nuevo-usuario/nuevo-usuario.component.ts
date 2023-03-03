import { Component, OnInit, ChangeDetectorRef, ViewChild, ViewRef } from '@angular/core';
import { Message, ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { RespuestaDto } from "src/app/components/model/respuestaDto";
import { Usuario } from '../model/usuario.model';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { authGuardService } from "src/app/service/auth-guard.service";
import { PagActualService } from '../../service/PagActualService';
import { UsuarioService } from '../../service/usuario.service';
import { AlertaComponent } from "src/app/util/alerta.component";



@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  providers: [MessageService]
})
export class NuevoUsuarioComponent  { }/*

  validarFormUsr: boolean = false;
  token: any;
  usuario: Usuario;
  usuarios !: Usuario[];
  rol: any;
  displayDialog !: boolean;
  perfilSelect !: SelectItem[];
  usuarioForm!: FormGroup;
  @ViewChild('formDirective', { static: false }) private formDirective !: NgForm;
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta !: AlertaComponent;
  selectedUsuario !: Usuario;
  idUsuario !: number;
  cols !: any[];
  nuevoUsuario !: boolean;
  msgs: Message[] = [];
  permisos;
  menuId: number = 6;

  show: boolean = true;

  constructor(
    private _usuarioService: UsuarioService,
    private service: MessageService,
    private PagActualService: PagActualService,
    private _authGuardService: authGuardService,
    private fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {
    this.token = this._authGuardService.getToken();
    this.usuario = this._authGuardService.getUser();
    this.permisos = this._authGuardService.getPermisos();
    // this.obtenerPermiso(this.permisos,this.menuId)
    this.PagActualService.setItems([ //administracion de label en que ubicacion se encuentra
      { label: 'Configuración' },
      { label: 'Usuarios', routerLink: ['/usuarios'] }
    ]);
  }




  showSuccessViaToast() {
    this.service.add({ key: 'agregar', severity: 'success', summary: 'Mensaje', detail: 'Los datos han sido guardados.' });
  }

  showInfoViaToast() {
    this.service.add({ key: 'eliminar', severity: 'info', summary: 'Mensaje', detail: 'Los datos han sido elimimnados' });
  }

  ngOnInit() {
    // if(!this.accesoPermitido){
    //   this.router.navigate(['/inicio'])
    // }
    this.cols = [//valor de columna del result 
      { field: 'descripcion', header: 'Perfil' },
      { field: 'num_empleado', header: 'num_empleado' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'usuario_ap', header: 'Apellido Paterno' }
    ];
    this.fnusuario();
    this.validadorFormSucursal();
    this.obtenerUsuarios();

  }

  validadorFormSucursal() {
    this.usuarioForm = this.fb.group({
      status: [''],
      idrol: ['', [Validators.required]],
      num_empleado: ['', [Validators.required]],
      password: ['', [Validators.required]],
      nipConfirm: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellidoM: ['', [Validators.required]],
      apelllidoP: ['', [Validators.required]]
      //, { validator: atLeastOne(Validators.required, ['sistema', 'region', 'localidad', 'estado', 'nombre_nodo']) }
      //atLeasOne se colocan los nombres de los campos y de todos solo uno debe estar lleno
    });


    //detecta los cambios de los validators
    this.usuarioForm.valueChanges.subscribe(value => {
      this.usuarioForm.valid;
      console.log("this.usuarioForm", this.usuarioForm)
      this._cdr.detectChanges();
    });
  }


  cargando(): void {
    setTimeout(() => {
      if (this._cdr !== null &&
        this._cdr !== undefined &&
        !(this._cdr as ViewRef).destroyed) {
        this._cdr.detectChanges();
      }
    }, 250);
  }

  showDialogToAdd() {
    this.nuevoUsuario = true;
    this.validarFormUsr = false;
    this.displayDialog = true;
    this.formDirective.resetForm();
  }

  save() {
    let objSucursal = [...this.usuarios];
    console.log("entro para pushear", this.nuevoUsuario)
    let descripcion_perfil = this.rol.filter;
    this.usuarioForm.value.descripcion = descripcion_perfil[0].descripcion;

    if (this.nuevoUsuario) {

      objSucursal.push(this.usuarioForm.value);
    }

    else {
      objSucursal[this.usuarios.indexOf(this.selectedUsuario)] = this.usuarioForm.value;
    }




    this.usuarios = objSucursal;
    //  this.gasera = null;
    this.displayDialog = false;
    this.showSuccessViaToast();
  }

  delete() {
    let index = this.usuarios.indexOf(this.selectedUsuario);
    this.usuarios = this.usuarios.filter((val, i) => i != index);
    // this.gasera = null;
    this.displayDialog = false;
    this.showInfoViaToast();
  }


  fnusuario() {
    this.perfilSelect = [];
    this.show = true;
    this._usuarioService.fnusuario(this.token)
      .subscribe(resp => {
        let respuestaDto = <RespuestaDto>resp;
        if (!respuestaDto.ok) {
          this.mensajeAlerta.alerta("AVISO", "", respuestaDto.mensaje, "");
          this.show = false;
        } else {
          this.rol = respuestaDto.addenda;
          for (let key in this.rol) {
            this.perfilSelect.push({ label: this.rol[key].descripcion, value: this.rol[key].idrol });
          }
          this.show = false;
        } // if
      },
        error => {
          let mensaje = <any>error;
          this.show = false;
          this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
        }
      );
  }



  obtenerUsuarios() {
    this.show = true;
    this._usuarioService.fnusuario(this.token)
      .subscribe(resp => {
        let respuestaDto = <RespuestaDto>resp;
        if (!respuestaDto.ok) {
          this.show = false;
          this.mensajeAlerta.alerta("AVISO", "", respuestaDto.mensaje, "");
        } else {
          this.usuarios = <Usuario[]>respuestaDto.addenda;
          this.cargando();
          this.show = false;
          console.log(" this.usuarios ", this.usuarios)
        } // if
      },
        error => {
          this.show = false;
          let mensaje = <any>error;
          this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
        }
      );
  }



  saveUsuario() {

    if (this.usuarioForm.valid && this.usuarioForm.value.password == this.usuarioForm.value.nipConfirm) {

      this._usuarioService.saveUsuario(this.usuarioForm.value)
        .subscribe(resp => {
          let respuestaDto = <RespuestaDto>resp;
          if (!respuestaDto.ok) {
            this.mensajeAlerta.alerta("AVISO", "", respuestaDto.mensaje, "");
          } else {
            this.usuarioForm.value.idUsuario = respuestaDto.addenda[0].id_insertado;
            //   this.mensajeAlerta.alerta("AVISO", "", respuestaDto.mensaje, "");
            this.save();

          } // if
        },
          error => {
            let mensaje = <any>error;
            this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
          }
        );
    }

  }
  onRowSelect() {
    this.validarFormUsr = false;

    console.log(this.usuarioForm)

    // this.usuarioForm.get('username').clearValidators();
    this.nuevoUsuario = false;
    
    this.displayDialog = true;
  }

  cloneUsuario(c: Usuario) {
    this.idUsuario = c.idUsuario;
    this.usuarioForm.setValue({
      num_empleado: c.num_empleado,
      nombre: c.nombre,
      idrol: c.idrol,
      password: c.password,
      nipConfirm: c.password,
      status: c.status,
      apellidoM: c.apellidoM,
      apelllidoP: c.apelllidoP,
    });

  }


  btnActualizarUsuario() {

    if (this.usuarioForm.valid) {
      this.usuarioForm.value.status = 1;
      this.usuarioForm.value.idrol = this.idUsuario;
      console.log("EL ID Sucursal", this.usuarioForm.value)
      this._usuarioService.saveUsuario(this.usuarioForm.value)
        .subscribe(resp => {
          let respuestaDto = <RespuestaDto>resp;
          if (!respuestaDto.ok) {
            this.mensajeAlerta.alerta("AVISO", "", respuestaDto.mensaje, "");
          } else {
            this.usuarioForm.value.status = 1;
            this.save();
          } // if
        },
          error => {
            let mensaje = <any>error;
            this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
          }
        );
    }
  }

  eliminarUsuario() {
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar este perfil?',
      accept: () => {
        this.usuarioForm.value.status = 0;
        this.usuarioForm.value.idUsuario = this.idUsuario;
        this._usuarioService.saveUsuario(this.usuarioForm.value)
          .subscribe(resp => {
            let respuestaDto = <RespuestaDto>resp;
            if (!respuestaDto.ok) {
              this.mensajeAlerta.alerta("AVISO", "", respuestaDto.mensaje, "");
            } else {
              this.delete();
            } // if
          },
            error => {
              let mensaje = <any>error;
              this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
            }
          );
      }
    });


  }
  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  } 

}

*/