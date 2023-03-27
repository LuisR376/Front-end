
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
    
    @Injectable()
    export class TicketService {
        
        datosActivos = {
            TipoActivo: {
                TipoActivo: '',
                },
            DatosCliente: {
                class: null,
                wagon: null,
                seat: null
            },
            Ubicacion: {
                cardholderName: '',
                cardholderNumber: '',
                date: '',
                cvv: '',
                remember: false
            }
        };
    
        private paymentComplete = new Subject<any>();
    
        paymentComplete$ = this.paymentComplete.asObservable();
    
        getTicketInformation() {
            return this.datosActivos;
        }
    
        setTicketInformation() {
            this.datosActivos;
        }
    
        complete() {
            this.paymentComplete.next(this.datosActivos.TipoActivo);
        }
    }
    