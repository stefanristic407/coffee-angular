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

  bounds: any = {};
  coordinates = [
    { lng: -121.1958, lat: 37.6683 },
    { lng: -121.1779, lat: 37.6687 },
    { lng: -121.1773, lat: 37.6792 },
    { lng: -121.1958, lat: 37.6792 },
    { lng: -121.1958, lat: 37.6683 },
  ];
  zoomMin = 10;
  zoomMax = 20;

  constructor(public globals: GlobalsService, public agroSrv: AgroService) {}

  ngOnInit(): void {
    this.changeWeatherType(0);
    this.bounds = this.calcTileBounds();
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

    this.calcTileBounds();
    const border = new google.maps.Polygon({
      paths: this.coordinates,
      strokeColor: '#1976D2',
      strokeWeight: 2,
    });
    border.setMap(map);

    const imageMapType = new google.maps.ImageMapType({
      getTileUrl: function (coord, zoom) {
        if (
          zoom < self.zoomMin ||
          zoom > self.zoomMax ||
          self.bounds[zoom].xTileMin > coord.x ||
          coord.x > self.bounds[zoom].xTileMax ||
          self.bounds[zoom].yTileMin > coord.y ||
          coord.y > self.bounds[zoom].yTileMax
        ) {
          return '';
        }
        return self.imageUrl
          .replace('{x}', '' + coord.x)
          .replace('{y}', '' + coord.y)
          .replace('{z}', '' + zoom);
      },
      tileSize: new google.maps.Size(256, 256),
    });

    map.overlayMapTypes.push(imageMapType);
  }

  calcTileBounds() {
    for (let zoom = this.zoomMin; zoom < this.zoomMax; zoom++) {
      const lngMin = _.min(_.pluck(this.coordinates, 'lng'));
      const latMin = _.min(_.pluck(this.coordinates, 'lat')) * Math.PI / 180;
      const lngMax = _.max(_.pluck(this.coordinates, 'lng'));
      const latMax = _.max(_.pluck(this.coordinates, 'lat')) * Math.PI / 180;
      const n = Math.pow(2, zoom);
      const xTileMin = Math.floor(n * ((lngMin + 180) / 360));
      const yTileMax = Math.floor(n * (1 - (Math.log(Math.tan(latMin) + 1 / Math.cos(latMin)) / Math.PI)) / 2);
      const xTileMax = Math.floor(n * ((lngMax + 180) / 360));
      const yTileMin = Math.floor(n * (1 - (Math.log(Math.tan(latMax) + 1 / Math.cos(latMax)) / Math.PI)) / 2);
      this.bounds = {
        ...this.bounds,
        [zoom]: {
          xTileMin,
          xTileMax,
          yTileMin,
          yTileMax
        }
      };
    }
  }
}
