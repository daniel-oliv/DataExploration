import { Component, OnInit, Output, EventEmitter, Input, OnDestroy} from '@angular/core';

import { MouseEvent } from '@agm/core';
import { DataService } from '../data.service';

import * as d3 from "d3";
import { _ } from 'underscore';

const numberOfCities = 5564;
const rangeFactor = 1.5;

@Component({
  selector: 'app-map-agm',
  templateUrl: './map-agm.component.html',
  styleUrls: ['./map-agm.component.css']
})
export class MapAgmComponent implements OnInit, OnDestroy {

  @Output() newMarkers = new EventEmitter<any>();
  @Input() points: marker[];
  iconFactor: number;
  data: any[];
  raw_data: any[];
  dataAttributes: [];
  mkeys = [
    "Mortalidade infantil 2000",
    //"Mortalidade infantil 2010",
    "Taxa de frequência bruta à pré-escola 2000"
    //"Taxa de fecundidade total 2000",

  ];

  dataExtent:any;
  svgIcon: any[];
  urlBack: string
  urlTear: string;
  urlSh: string;

  constructor(dataServ: DataService) { 
    this.data = [];
    this.raw_data = [];
    this.svgIcon = [];
    this.dataExtent = {};
    this.iconFactor = 8;
    this.markers = [];
    const data = this.data;
    const raw_data = this.raw_data;
    const svgElement = this.svgIcon;
    var urlSvg = './assets/img/oneTearResized.svg';
    this.urlBack = './assets/img/background.svg';
    this.urlTear = './assets/img/justTear.svg';
    this.urlSh = './assets/img/justSoother.svg';

    dataServ.arrivedData.subscribe((param) =>
    {
      //console.log(param);
      raw_data.push(param);
      
      if(raw_data.length >= numberOfCities)
      {
        //console.log(data);
        this.fillNumData(raw_data);
        
      }
    });
    // d3.xml('./assets/img/oneTearResized.svg')
    //         .then(data => {
    //           console.log("this.svgIcon")
    //           svgElement.push(data);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         })
    //         console.log("this.svgIcon");
    // console.log(this.svgIcon);
  }

  fillNumData(raw_data)
  {
    this.data = raw_data.map(function(d) {
      //console.log("new row: raw_data[1] ", raw_data[1]);
      for (var k in d) {
        //console.log(k);
        //console.log("raw_data[0][k]", raw_data[0][k]);
        if (!_.isNaN(raw_data[0][k] - 0) && k != 'id') {
          d[k] = parseFloat(d[k]) || 0;
        }
      };
      return d;
    });
    //let sample = this.getSampleArray(this.data, 800);
    //this.setConfigScales(sample);
    //this.addMarkers(sample);

    this.setConfigScales(this.data);
    this.addMarkers(this.data);
  }

  getSampleArray(baseArray: any, numberOfEl: number)
  {
    let sample = [];
    for (let index = 0; index < numberOfEl; index++) {
      sample.push(baseArray[
        Math.floor(Math.random() * baseArray.length)
      ]);      
    }
    return sample;
  }

  getNumber(d, raw_data) {
    //console.log("new row: raw_data[1] ", raw_data[1]);
    for (var k in d) {
      //console.log(k);
      //console.log("raw_data[0][k]", raw_data[0][k]);
      if (!_.isNaN(raw_data[0][k] - 0) && k != 'id') {
        d[k] = parseFloat(d[k]) || 0;
      }
    };
    return d;
  }

  setConfigScales(data)
  {
    //console.log(d3.keys(data[0]));
    let keys = d3.keys(data[0]);
    for (const key of keys) {
      //console.log(key);
      let rangeArray = d3.extent(data, function(d) { return +d[key]; });
      
      let scaleConf: scaleConfig = {
        min: rangeArray[0],
        max: rangeArray[1]
      }
      this.dataExtent[key] = scaleConf;
    }
    //console.log(this.dataExtent); 
  }

  getScaleFactor(keyDimension: string, attValue:number ): number
  {
    //f.log("keyDimension",keyDimension);
    //console.log("attValue",attValue);
    let scaleConf = this.dataExtent[keyDimension];
    if(scaleConf){
    //console.log("getScaleFactor", (attValue - scaleConf.min) / (scaleConf.max - scaleConf.min));
      return  (attValue - scaleConf.min) / (scaleConf.max - scaleConf.min);
    }
    else
    {
      return 1;
    }
  }

  addMarkers(data: any){
    for (const dat of data) {
      //console.log("dat ",dat);
      //console.log("dat lat ",dat["lat"]);
      let tearFac = this.getScaleFactor(this.mkeys[0], dat[this.mkeys[0]])*4;
      let shFac = this.getScaleFactor(this.mkeys[1], dat[this.mkeys[1]])*2;
      
      this.addMarker(
        dat['lat'],
        dat['lng'],
        this.createBackIcon(1),
        0.8
        );
      this.addMarker(
        dat['lat'],
        dat['lng'],
        this.createTearIcon(tearFac),
        tearFac
        );
      this.addMarker(
        dat['lat'],
        dat['lng'],
        this.createSootherIcon(shFac),
        shFac
        );
    }
    
  }

  addMarker(lat: any, lng: any, iconObj: any, iconFactor: number)
  {
    this.markers.push(
      {
      lat: lat,
      lng: lng,
      //label: '1',
      draggable: false,
      icon: iconObj,
      iconFactor: iconFactor
      }
    );

    //console.log(this.markers);
  }

  ngOnDestroy(){
  }

  ngOnInit() 
  {
    // d3.csv("https://raw.githubusercontent.com/daniel-oliv/dataRep/master/2000-2010.csv", function(data)
    //   {
        
    //     console.log("data map", data);
        
    //     //console.log(err);
    //   });

    // this.markers = [
    //   {
    //     lat: -18.5873,
    //     lng: -46.5147,
    //     //label: '1',
    //     draggable: true,
    //     icon: this.createBackIcon(0.20)
    //   },
    //   {
    //     lat: -18.5873,
    //     lng: -46.5147,
    //     //label: '1',
    //     draggable: true,
    //     icon: this.createTearIcon(0.20)
    //   }
    //   // ,
    //   // {
    //   //   lat: -18.9128,
    //   //   lng: -48.2755,
    //   //   //label: '3',
    //   //   draggable: false,
    //   //   icon: this.createIcon()
    //   // },
    //   // {
    //   //   lat: -18.7307,
    //   //   lng: -47.4917,
    //   //   //label: '2',
    //   //   draggable: true,
    //   //   icon: this.createIcon()
    //   // },
    //   // {
    //   //   lat: -19.5906,
    //   //   lng: -46.9442,
    //   //   //label: '4',
    //   //   draggable: true,
    //   //   icon: this.createIcon()
    //   // }
    // ];

    this.newMarkers.emit(this.markers);
    
  }

  

  createIcon(urlLink: string, attFactor, zoomFactor?: number) : inconInterface
  {
    let factor = zoomFactor ?   zoomFactor * this.iconFactor :this.iconFactor;
    //this.iconFactor = this.iconFactor * 1.1;
    factor = this.applyAttributeFactor(attFactor, factor);
    let icon = {
      url: urlLink,
      scaledSize: {
          width: factor*4,
          height: factor*3
      }
    };
    //console.log(icon)
    return icon;
  }

  createTearIcon(attFactor, zoomFactor?: number) : inconInterface
  {
    let factor = zoomFactor ?   zoomFactor * this.iconFactor :this.iconFactor;
    //this.iconFactor = this.iconFactor * 1.1;
    factor = this.applyAttributeFactor(attFactor, factor);
    let icon = {
      url: this.urlTear,
      scaledSize: {
          width: factor*4,
          height: factor*3
      }
    };
    //console.log(icon)
    return icon;
  }

  createSootherIcon(attFactor, zoomFactor?: number) : inconInterface
  {
    let factor = zoomFactor ?   zoomFactor * this.iconFactor :this.iconFactor;
    //this.iconFactor = this.iconFactor * 1.1;
    factor = this.applyAttributeFactor(attFactor, factor);
    let icon = {
      url: this.urlSh,
      scaledSize: {
          width: factor*4,
          height: factor*3
      }
    };
    //console.log(icon)
    return icon;
  }

  applyAttributeFactor(attFactor: number, factor: number): number
  {
    return attFactor * factor *19/20 + factor/20;
  }

  createBackIcon(attFactor: number, zoomFactor?: number) : inconInterface
  {
    let factor = zoomFactor ?   zoomFactor * this.iconFactor :this.iconFactor;
    //factor = this.applyAttributeFactor(attFactor, factor);
    //this.iconFactor = this.iconFactor * 1.1;
    let icon = {
      url: this.urlBack,
      scaledSize: {
          width: factor*4,
          height: factor*3
      }
    };
    //console.log(icon)
    return icon;
  }

  nextLabel  = 5;

  zoom: number = 8;
  
  // initial center position for the map
  lat: number = -18.9128;
  lng: number = -48.2755;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng,
    //   //label: this.nextLabel.toString(),
    //   draggable: true,
    //   icon: this.createIcon()
    // });
    // this.nextLabel++;

    // this.newMarkers.emit(this.markers);
  }

  zoomChanged(event){
    console.log(event );
    let zFactor = event/8;
    console.log(zFactor );
    for (const m of this.markers) {
      m.icon = this.createIcon(m.icon.url, m.iconFactor, zFactor);
    }
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    m.lat = $event.coords.lat;
    m.lng = $event.coords.lng;
    //console.log('dragEnd', m, $event);
    //console.log('new ', $event.coords.lat);
    this.newMarkers.emit(this.markers);
  }
  
  markers: marker[];

}


declare interface marker {
	lat: number;
	lng: number;
	label?: string;
  draggable: boolean;
  icon?: inconInterface;
  iconFactor?: number;
}

declare interface inconInterface{
  url: string,
  scaledSize: {
      width: number,
      height: number
  }
}

declare interface scaleConfig{
  max: number;
  min: number;

}
