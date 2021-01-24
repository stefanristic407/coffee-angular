import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AgroService } from 'src/services/agro.service';
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
    selector: 'app-image-map',
    templateUrl: './image-map.component.html',
    styleUrls: ['./image-map.component.scss'],
})
export class ImageMapComponent implements OnInit {
    @Input() polygonId: string;
    imageUrl = '';
    imageTypes: any[] = [
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
    center: any;
    coordinates: any[] = [];
    zoomMin = 10;
    zoomMax = 20;

    constructor(public agroSrv: AgroService) {}

    ngOnInit(): void {
        this.changeWeatherType(0);
        this.bounds = this.calcTileBounds();
        this.getPolygon();
        this.getData();
    }

    changeWeatherType(value) {
        this.selType = value;
        this.makeData();
    }

    changeDate() {
        this.getData();
    }

    getPolygon() {
        this.agroSrv.getPloygon(this.polygonId).subscribe(
            (res: any) => {
                this.center = { lng: res.center[0], lat: res.center[1] };
                this.coordinates = [];
                res.geo_json.geometry.coordinates.forEach((element) => {
                    element.forEach((item) => {
                        this.coordinates.push({ lng: item[0], lat: item[1] });
                    });
                });
                this.makeData();
            },
            (err: HttpErrorResponse) => {
                console.log(err);
            },
        );
    }

    getData() {
        const query = {
            start: moment(this.selectedDate).startOf('day').subtract(4, 'days').unix(),
            end: moment(this.selectedDate).startOf('day').unix(),
        };

        this.agroSrv.getImage(this.polygonId, query).subscribe(
            (res: any) => {
                this.weatherData = res;
                this.makeData();
            },
            (err: HttpErrorResponse) => {
                console.log(err);
            },
        );
    }

    makeData() {
        if (this.weatherData.length && this.center && this.coordinates.length) {
            this.imageUrl =
                this.weatherData[this.weatherData.length - 1].tile[this.imageTypes[this.selType].index] || '';
            this.initMap();
        }
    }

    initMap(): void {
        const self = this;
        const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
            zoom: 14,
            center: self.center,
            mapTypeId: 'satellite',
        });

        this.calcTileBounds();
        const border = new google.maps.Polygon({
            paths: this.coordinates,
            strokeColor: '#1976D2',
            strokeWeight: 2,
        });
        border.setMap(map);

        const imageMapType = new google.maps.ImageMapType({
            getTileUrl: (coord, zoom) => {
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
        const lngMin = _.min(_.pluck(this.coordinates, 'lng'));
        const latMin = (_.min(_.pluck(this.coordinates, 'lat')) * Math.PI) / 180;
        const lngMax = _.max(_.pluck(this.coordinates, 'lng'));
        const latMax = (_.max(_.pluck(this.coordinates, 'lat')) * Math.PI) / 180;
        for (let zoom = this.zoomMin; zoom < this.zoomMax; zoom++) {
            const n = Math.pow(2, zoom);
            const xTileMin = Math.floor(n * ((lngMin + 180) / 360));
            const yTileMax = Math.floor((n * (1 - Math.log(Math.tan(latMin) + 1 / Math.cos(latMin)) / Math.PI)) / 2);
            const xTileMax = Math.floor(n * ((lngMax + 180) / 360));
            const yTileMin = Math.floor((n * (1 - Math.log(Math.tan(latMax) + 1 / Math.cos(latMax)) / Math.PI)) / 2);
            this.bounds = {
                ...this.bounds,
                [zoom]: {
                    xTileMin,
                    xTileMax,
                    yTileMin,
                    yTileMax,
                },
            };
        }
    }
}
