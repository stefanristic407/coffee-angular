import { Component, OnInit } from '@angular/core';
import { SourcingService } from '../sourcing.service';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-available-coffee-list',
  templateUrl: './available-coffee-list.component.html',
  styleUrls: ['./available-coffee-list.component.css']
})
export class AvailableCoffeeListComponent implements OnInit {
	items: GalleryItem[];



	public data = [
		{
		  srcUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg',
		  previewUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg'
		},
		{
		  srcUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
		  previewUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
		},
		{
		  srcUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg',
		  previewUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg'
		},
		{
		  srcUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg',
		  previewUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg'
		}
	  ];
	  imageData = this.data;
	public coffeedata: any[] = [
		{  estatename: 'Finca La Pampa', name: 'Organic washed Micro-lot',origin:'Colombia', species: 'Bourbon', price: '$7.4 USD / kg',quantity:'287 bags','image':'/assets/images/sourcing-image1.jpg',score:'84.5' },
		{  estatename: 'Gesha', name: 'Blend washed',origin:'Colombia',species: 'Bourbon', price: '$5.53USD / kg',quantity:'297 bags','image':'/assets/images/sourcing-image3.jpg',score:'88' },
		{  estatename: 'Finca La Toboba', name: 'FTO blend',origin:'Ethopia', species: 'Bourbon', price: '$8.92 USD /kg',quantity:'567 bags','image':'/assets/images/sourcing-image7.jpg',score:'81.5' },
		// {  estatename: 'Asoproaaa', name: 'Mebratu', origin:'Brazil',species: 'Bourbon', price: '$7.4 USD / kg',quantity:'953 bags','image':'/assets/images/sourcing-image5.jpg',score:'85.4' },
		// {  estatename: 'Cafe Directo', name: 'FTO Semi washed', origin:'Ethopia',species: 'Bourbon', price: '$5.6 USD / kg',quantity:'110 bags','image':'/assets/images/sourcing-image4.jpg',score:'82' },
		// {  estatename: 'La Isabela', name: 'Blend1',origin:'Colombia', species: 'Bourbon', price: '$8.92 USD /kg',quantity:'450 bags','image':'/assets/images/sourcing-image8.jpg',score:'84' }
  ];

  constructor(private sourcingService:SourcingService, public gallery: Gallery, public lightbox: Lightbox) { }
  responsiveOptions:any[] = [
	{
		breakpoint: '1024px',
		numVisible: 5
	},
	{
		breakpoint: '768px',
		numVisible: 3
	},
	{
		breakpoint: '560px',
		numVisible: 1
	}
];

  ngOnInit(): void {
	this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
	const lightboxRef = this.gallery.ref('lightbox');
	lightboxRef.setConfig({
		imageSize: ImageSize.Cover,
		thumbPosition: ThumbnailsPosition.Top
	  });
	  lightboxRef.load(this.items);
  }

}
