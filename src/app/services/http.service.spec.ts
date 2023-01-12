import {of} from 'rxjs';
import {HttpService} from './http.service';

describe('Pruebas para servicio HttpService', () => {
    let service: HttpService;
    let urlTest='test';
    let response:any=[];
    let httpClientSpy: {
        get: jasmine.Spy, 
        post: jasmine.Spy, 
        put: jasmine.Spy, 
        delete: jasmine.Spy
    };
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
        service = new HttpService(httpClientSpy as any);
    });
    it('Debe crearse el servicio HttpService correctamente',()=>{
        expect(service).toBeTruthy();
    });

    it('Prueba para getById',(done:DoneFn)=>{
        httpClientSpy.get.and.returnValue(of(response));
        service.get(urlTest,urlTest).subscribe(answer=>{
            expect(answer).toEqual(response)
            done();
        });
    });

})