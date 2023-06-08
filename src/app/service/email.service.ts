import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaDto } from '../components/model/respuestaDto';
import { Observable } from 'rxjs';
import { UtilApiService } from './util-api.service';
import { environment } from 'src/environments/environment';

@Injectable()

export class EmailService {
    public url: string;
    constructor(
        private http: HttpClient,
        private _apiService: UtilApiService
    ) {
        this.url = environment.url;
    }
    sendEmail(emailData: any): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(emailData, this.url + "nodemailer/post");
    }// Post sendEmail
}
