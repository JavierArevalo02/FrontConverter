import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { converterService } from './service';
 

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  coins: any = [];
  amount:any;
  result:any;
  selectedFrom:any="FROM";
  selectedTo:any="TO";
  alert:boolean=false;
  message:string="";
  apiKey:any;
  apis=[
    {name:"Exchange Rates Data API", value:"Exchange"},
    {name:"Currency Data API", value:"Currency"},
    {name:"Fixer API", value:"Fixer"},
  ]
  selectedAPI=this.apis[0].value;
  

  private _jsonURL = 'assets/json/monedas.json';
  constructor(private http: HttpClient, private convertService:converterService){}

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  ngOnInit() {
    this.getJSON().subscribe(data => {
      //this.coins=data.currencies
      data.currencies.map((coin:any)=>{
        var listcoin={
          "symbol":coin.symbol,
          "name": coin.name+" ("+coin.symbol+") "
        }
        this.coins.push(listcoin)
      })
     });
  }

  converter(){
    this.result=undefined;
    if(this.amount==null){
      this.amount= undefined;
    }
    if(this.selectedFrom == "FROM" && this.selectedTo == "TO" && this.amount == undefined){
      this.message="Please complete the inputs";
      this.alert=true;
    }else if(this.selectedFrom == "FROM" && this.selectedTo != "TO" && this.amount != undefined){
      this.message="Please complete the intput 'From'";
      this.alert=true;
    }else if(this.selectedFrom != "FROM" && this.selectedTo == "TO" && this.amount != undefined){
      this.message="Please complete the input 'To'";
      this.alert=true;
    }else if (this.selectedFrom != "FROM" && this.selectedTo != "TO" && this.amount == undefined){
      this.message="Please complete the input 'Amount'";
      this.alert=true;
    } else if(this.selectedFrom != "FROM" && this.selectedTo == "TO" && this.amount == undefined){
      this.message="Please complete the inputs 'To' and 'Amount'";
      this.alert=true;
    } else if(this.selectedFrom == "FROM" && this.selectedTo != "TO" && this.amount == undefined){
      this.message="Please complete the inputs 'From' and 'Amount'";
      this.alert=true;
    }else if(this.selectedFrom == "FROM" && this.selectedTo == "TO" && this.amount != undefined){
      this.message="Please complete the inputs 'From' and 'To'";
      this.alert=true;}
    else if(this.selectedFrom == this.selectedTo){
      this.message="The inputs 'From' and 'To' must be different";
      this.alert=true;
    }else if(this.amount == 0 || this.amount <0){
      this.message="The amount must be greater than zero";
      this.alert=true;
    }else{
      var url = "to="+this.selectedTo+"&from="+this.selectedFrom+"&amount="+this.amount
      if(this.apiKey== undefined || this.apiKey==''){
        this.message="Please complete the input 'Api Key'";
        this.alert=true;
      }else{
        this.message="";
        this.alert=false;
        var myHeaders = {headers:{"apikey":this.apiKey}}
        switch (this.selectedAPI) {
          case 'Exchange':
            this.convertService.getExchangerates(url,myHeaders).subscribe(data=>{
              this.result=data.result
            },(error)=>{
              this.message="Status error: "+error.status+", "+error.error.message+".";
              this.alert=true;
            })
            break;
          case 'Currency':
            this.convertService.getCurrency(url,myHeaders).subscribe(data=>{
              this.result=data.result
            },(error)=>{
              this.message="Status error: "+error.status+", "+error.error.message+".";
              this.alert=true;
            })
            break;
          case 'Fixer':
            this.convertService.getFixer(url,myHeaders).subscribe(data=>{
              this.result=data.result
            },(error)=>{
              this.message="Status error: "+error.status+", "+error.error.message+".";
              this.alert=true;
            })
            break;
        }
      }
    }
  }
  clean(){
    this.apiKey=undefined
    this.message='';
    this.alert=false;
    this.selectedFrom="FROM";
    this.selectedTo="TO";
    this.amount=undefined;
    this.result=undefined;
  }

  closeAlert(){
    this.message='';
    this.alert=false;
  }
}
