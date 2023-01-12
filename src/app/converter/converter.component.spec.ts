import {ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { converterService } from './service';


import { ConverterComponent } from './converter.component';
import { delay, of } from 'rxjs';

describe('ConverterComponent', () => {
  let component: ConverterComponent;
  let fixture: ComponentFixture<ConverterComponent>;
  let response={
    "date": "2005-01-01",
    "historical": true,
    "info": {
      "quote": 0.51961,
      "timestamp": 1104623999
    },
    "query": {
      "amount": 10,
      "from": "USD",
      "to": "GBP"
    },
    "result": 5.1961,
    "success": true
  }
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ ConverterComponent ],
      imports:[
        HttpClientTestingModule,
      ],
      providers:[
        converterService
    ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Clean', () => {
    expect(component).toBeTruthy();
    component.clean();
    expect(component.alert).toEqual(false)
  });

  it('closeAlert', () => {
    expect(component).toBeTruthy();
    component.closeAlert();
    expect(component.alert).toEqual(false)
  });

  it('converter Please complete the inputs',()=>{
    expect(component).toBeTruthy();
    component.amount=null;
    component.selectedFrom="FROM"
    component.selectedTo="TO"
    component.converter();
    expect(component.amount).toEqual(undefined);
    expect(component.message).toEqual("Please complete the inputs")
  })

  it('converter Please complete the intput "From"',()=>{
    expect(component).toBeTruthy();
    component.amount=2;
    component.selectedFrom="FROM"
    component.selectedTo="COP"
    component.converter();
    expect(component.message).toEqual("Please complete the intput 'From'")
  })

  it('Converter Please complete the input "To"',()=>{
    expect(component).toBeTruthy();
    component.amount=2;
    component.selectedFrom="COP"
    component.selectedTo="TO"
    component.converter();
    expect(component.message).toEqual("Please complete the input 'To'")
  })

  it('Converter Please complete the input "Amount"',()=>{
    expect(component).toBeTruthy();
    component.amount=null;
    component.selectedFrom="COP"
    component.selectedTo="EUR"
    component.converter();
    expect(component.message).toEqual("Please complete the input 'Amount'")
  })

  it('Converter Please complete the inputs "To" and "Amount"',()=>{
    expect(component).toBeTruthy();
    component.amount=null;
    component.selectedFrom="COP"
    component.selectedTo="TO"
    component.converter();
    expect(component.message).toEqual("Please complete the inputs 'To' and 'Amount'")
  })

  it('Converter Please complete the inputs "From" and "Amount"',()=>{
    expect(component).toBeTruthy();
    component.amount=null;
    component.selectedFrom="FROM"
    component.selectedTo="COP"
    component.converter();
    expect(component.message).toEqual("Please complete the inputs 'From' and 'Amount'")
  })

  it('Converter Please complete the inputs "From" and "To"',()=>{
    expect(component).toBeTruthy();
    component.amount=2;
    component.selectedFrom="FROM"
    component.selectedTo="TO"
    component.converter();
    expect(component.message).toEqual("Please complete the inputs 'From' and 'To'")
  })

  it('Converter The inputs "From" and "To" must be different',()=>{
    expect(component).toBeTruthy();
    component.amount=2;
    component.selectedFrom="COP"
    component.selectedTo="COP"
    component.converter();
    expect(component.message).toEqual("The inputs 'From' and 'To' must be different")
  })

  it('Converter The amount must be greater than zero amount==0',()=>{
    expect(component).toBeTruthy();
    component.amount=0;
    component.selectedFrom="EUR"
    component.selectedTo="COP"
    component.converter();
    expect(component.message).toEqual("The amount must be greater than zero")
  })

  it('Converter The amount must be greater than zero amount < 0',()=>{
    expect(component).toBeTruthy();
    component.amount=-1;
    component.selectedFrom="EUR"
    component.selectedTo="COP"
    component.converter();
    expect(component.message).toEqual("The amount must be greater than zero")
  })

  it('Converter Please complete the input "Api Key"',()=>{
    expect(component).toBeTruthy();
    component.amount=1;
    component.apiKey = undefined
    component.selectedAPI="Exchange"
    component.selectedFrom="EUR"
    component.selectedTo="COP"
    component.converter();
    expect(component.message).toEqual("Please complete the input 'Api Key'")
  })

  it('Converter API Exchange',fakeAsync(()=>{
    expect(component).toBeTruthy();
    component.amount=1;
    component.apiKey = "test"
    component.selectedAPI="Exchange"
    component.selectedFrom="EUR"
    component.selectedTo="COP"
    let serviceConverter = fixture.debugElement.injector.get(converterService);
    let fakeCallBonusType = spyOn(serviceConverter,"getExchangerates").and.callFake(()=>{
      return of(response).pipe(delay(200));
    });
    component.converter();
    tick(200);
    expect(component.alert).toEqual(false)
  }));

  it('Converter API Currency',fakeAsync(()=>{
    expect(component).toBeTruthy();
    component.amount=1;
    component.apiKey = "test"
    component.selectedAPI="Currency"
    component.selectedFrom="EUR"
    component.selectedTo="COP"
    let serviceConverter = fixture.debugElement.injector.get(converterService);
    let fakeCallBonusType = spyOn(serviceConverter,"getCurrency").and.callFake(()=>{
      return of(response).pipe(delay(200));
    });
    component.converter();
    tick(200);
    expect(component.alert).toEqual(false)
  }));

  it('Converter API Fixer',fakeAsync(()=>{
    expect(component).toBeTruthy();
    component.amount=1;
    component.apiKey = "test"
    component.selectedAPI="Fixer"
    component.selectedFrom="EUR"
    component.selectedTo="COP"
    let serviceConverter = fixture.debugElement.injector.get(converterService);
    let fakeCallBonusType = spyOn(serviceConverter,"getFixer").and.callFake(()=>{
      return of(response).pipe(delay(200));
    });
    component.converter();
    tick(200);
    expect(component.alert).toEqual(false)
  }));  

});
