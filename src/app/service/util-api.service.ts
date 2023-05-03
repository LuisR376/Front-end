import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaDto } from '../components/model/respuestaDto';

@Injectable()
export class UtilApiService {

    constructor(private _http: HttpClient) {}
    public sendPostRequest(aEnviar: any, url: string): Observable<any> {
        let json = JSON.stringify(aEnviar);
        let params = "json=" + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(url, json, { headers: headers });
    } // sendPostRequest

    public sendGetRequest( url: string , token: any): Observable<any> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': ': ' + token + '' });
        return this._http.get<RespuestaDto>(url, { headers: headers });
    } // sendGetRequest
    public sendPutRequest(aEnviar: any, url: string): Observable<any> {
        let json = JSON.stringify(aEnviar);
        let params = "json=" + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(url, json, { headers: headers });
      } // sendPutRequest
      
}