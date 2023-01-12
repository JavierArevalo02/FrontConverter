import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

/**
 * Class service connection https
 */
@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(private http: HttpClient) {
  }
  get <T=any>(service:any,endpoint: string, options?: Object):Observable<T>{ 
    return this.http.get<T>(`${service}${endpoint}`, options);
  }
 
}