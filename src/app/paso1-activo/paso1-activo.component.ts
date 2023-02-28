import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CustomerService } from '../service/CustomerService';
@Component({
  selector: 'app-paso1-activo',
  templateUrl: './paso1-activo.component.html',
  styleUrls: ['./paso1-activo.component.css']
})
export class Paso1ActivoComponent {

  personalInformation: any;

    submitted: boolean = false;

    constructor(public ticketService: CustomerService, private router: Router) { }

    
}