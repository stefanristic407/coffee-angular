import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { AgroService } from 'src/services/agro.service';
import * as moment from 'moment';
import * as _ from 'underscore';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-image-map',
  templateUrl: './image-map.component.html',
  styleUrls: ['./image-map.component.scss'],
})
export class ImageMapComponent implements OnInit {
  imageUrl = '';
  weatherTypes: any[] = [
    {
      value: 0,
      label: 'True colour',
      title: 'True colour',
      index: 'truecolor',
    },
    {
      value: 1,
      label: 'False colour',
      title: 'False colour',
      index: 'falsecolor',
    },
    {
      value: 2,
      label: 'NDVI',
      title: 'NDVI',
      index: 'ndvi',
    },
    {
      value: 3,
      label: 'EVI',
      title: 'EVI',
      index: 'evi',
    },
  ];
  selType = 0;
  selectedDate = new Date();
  weatherData: any[] = [];

  constructor(public globals: GlobalsService, public agroSrv: AgroService) {}

  ngOnInit(): void {
    this.changeWeatherType(0);
    this.getData();
  }

  changeWeatherType(value) {
    this.selType = value;
    this.makeData();
  }

  changeDate(value) {
    if (moment(value).isValid()) {
      this.selectedDate = new Date(value);
      this.getData();
    }
  }

  getData() {
    const query = {
      start: moment(this.selectedDate).subtract(4, 'days').unix(),
      end: moment(this.selectedDate).startOf('day').unix(),
    };

    this.agroSrv.getImage(query).subscribe(
      (res: any) => {
        this.weatherData = res;
        this.makeData();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  makeData() {
    if (this.weatherData.length) {
      this.imageUrl =
        this.weatherData[this.weatherData.length - 1].tile[
          this.weatherTypes[this.selType].index
        ] || '';
      this.initMap();
    }
  }

  initMap(): void {
    const self = this;
    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 14,
        center: { lat: 37.6733, lng: -121.1858 },
      }
    );

    const coordinates = [
      { lng: -121.1958, lat: 37.6683 },
      { lng: -121.1779, lat: 37.6687 },
      { lng: -121.1773, lat: 37.6792 },
      { lng: -121.1958, lat: 37.6792 },
      { lng: -121.1958, lat: 37.6683 },
    ];
    const border = new google.maps.Polygon({
      paths: coordinates,
      strokeColor: '#1976D2',
      strokeWeight: 2,
    });
    border.setMap(map);

    const imageMapType = new google.maps.ImageMapType({
      getTileUrl: function (coord, zoom) {
        // if (
        //   zoom < 17 ||
        //   zoom > 20 ||
        //   bounds[zoom][0][0] > coord.x ||
        //   coord.x > bounds[zoom][0][1] ||
        //   bounds[zoom][1][0] > coord.y ||
        //   coord.y > bounds[zoom][1][1]
        // ) {
        //   return '';
        // }
        return self.imageUrl
          .replace('{x}', '' + coord.x)
          .replace('{y}', '' + coord.y)
          .replace('{z}', '' + zoom);
      },
      tileSize: new google.maps.Size(256, 256),
    });

    map.overlayMapTypes.push(imageMapType);
  }
}
