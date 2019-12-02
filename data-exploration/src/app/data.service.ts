import { Injectable, EventEmitter, Output,OnInit } from '@angular/core';
import * as d3 from "d3";

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit{

  @Output() arrivedData = new EventEmitter<any>();
  dataArr: any [];

  constructor() {
    const arrivedData = this.arrivedData;
    d3.csv("https://raw.githubusercontent.com/daniel-oliv/dataRep/master/ComCoordenadas.csv", function(data)
      {
        
        //console.log("data", data);
        //console.log(err);
        
        arrivedData.emit(data);
      });
    
  }

  ngOnInit() 
    {
      
      
     }

}
