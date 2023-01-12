import {of} from 'rxjs';
import {converterService} from './service';

describe('Prueba de servicio requestService', () => {
    let httpClientSpy: {
        get: jasmine.Spy,
    };

    let service:converterService;
    let response:any=[];
    let url='test';
    let headers={"apikey":"test"}

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new converterService(httpClientSpy as any);
    });

    it('Prueba para getCurrency',(done:DoneFn)=>{
        httpClientSpy.get.and.returnValue(of(response));
        service.getCurrency(url,headers).subscribe(answer=>{
            expect(answer).toEqual(response)
            done();
        })
    });

    it('Prueba para getExchangerates',(done:DoneFn)=>{
        httpClientSpy.get.and.returnValue(of(response));
        service.getExchangerates(url,headers).subscribe(answer=>{
            expect(answer).toEqual(response)
            done();
        })
    });

    it('Prueba para getFixer',(done:DoneFn)=>{
        httpClientSpy.get.and.returnValue(of(response));
        service.getFixer(url,headers).subscribe(answer=>{
            expect(answer).toEqual(response)
            done();
        })
    });
})