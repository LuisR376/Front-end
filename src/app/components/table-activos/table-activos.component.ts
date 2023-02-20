import { Component, OnInit,ViewChild } from '@angular/core';
import {Activos} from '../model/activos.model'
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../service/CustomerService';
import { authGuardService } from '../../service/auth-guard.service';
import { AlertaComponent } from '../../util/alerta.component';
import { RespuestaDto } from '../model/respuestaDto';
@Component({
  selector: 'app-table-activos',
  templateUrl: './table-activos.component.html',
  styleUrls: ['./table-activos.component.css'],
  providers: [MessageService,ConfirmationService]
})

export class TableActivosComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  productDialog !: boolean;
  activos : Activos[] = [];
  product : Activos = {};
  selectedProducts : Activos [] = [];
  submitted !: boolean;
estado !: any[];
token : string;
deleteProductDialog: boolean = false;
deleteProductsDialog: boolean = false;
cols: any[] = [];
statuses: any[] = [];
rowsPerPageOptions = [5, 10, 20];
  constructor(
    private customerService: CustomerService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    public _authGuardService: authGuardService
    ) {
    this.token = this._authGuardService.getToken(); 
  }
ngOnInit() {
  this.obtenerActivos();
  this.estado = [
    {label: 'INSTOCK', value: '1'},
    {label: 'LOWSTOCK', value: '0'},
    {label: 'OUTOFSTOCK', value: '0'}
];
}
obtenerActivos(){
  console.log("Token",this.token);
    this.customerService.getActivos(this.token).subscribe({
      next : (resp: RespuestaDto)  => {
        console.log("Obtener Activos",resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.activos = resp.addenda;
          this.estado = [
            {label: 'INSTOCK', value: 'instock'},
            {label: 'LOWSTOCK', value: 'lowstock'},
            {label: 'OUTOFSTOCK', value: 'outofstock'}
        ];
        } else {

        } // if
      },
        error : (error) => {
          let mensaje = <any>error;
          this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
        }
      });
  }
 

    valiDator() {
        //this.customerService.getActivos().then(data => this.activos = data);

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Activos) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Activos) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.activos = this.activos.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.activos = this.activos.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.nombre_equipo?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.activos[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.host_teamviewer = this.createId();
                this.product.Pertenencia = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.activos.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.activos = [...this.activos];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.activos.length; i++) {
            if (this.activos[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: any, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
