import { Component } from '@angular/core';

import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dataMarkers: marker[];

  constructor(dataServ: DataService){}
}

declare interface marker {
	lat: number;
	lng: number;
	label?: string;
  draggable: boolean;
  icon?: inconInterface;
}

declare interface inconInterface{
  url: string,
  scaledSize: {
      width: number,
      height: number
  }
}
