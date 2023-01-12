import { Injectable } from '@angular/core';
import {retry, catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpService} from '../services/http.service';
import {environment} from '../../environments/environment';


const serviceFixer = environment.converterServiceFixer;
const serviceCurrency = environment.converterServiceCurrency;
const serviceExchangerates = environment.converterServiceExchangerates;



@Injectable({
    providedIn: 'root'
  })

  export class converterService{
    constructor(private httpService: HttpService) {}

    getFixer(url:any,myHeaders:any):Observable<any>{
        return this.httpService.get(serviceFixer,url,myHeaders)
        .pipe(retry(1));
    }

    getCurrency(url:any,myHeaders:any):Observable<any>{
        return this.httpService.get(serviceCurrency,url,myHeaders)
        .pipe(retry(1));
    }

    getExchangerates(url:any,myHeaders:any):Observable<any>{
        return this.httpService.get(serviceExchangerates,url,myHeaders)
        .pipe(retry(1));
    }
  }