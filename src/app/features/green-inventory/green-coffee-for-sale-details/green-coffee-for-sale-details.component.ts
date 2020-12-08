import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { GlobalsService } from 'src/services/globals.service';
@Component({
  selector: 'app-green-coffee-for-sale-details',
  templateUrl: './green-coffee-for-sale-details.component.html',
  styleUrls: ['./green-coffee-for-sale-details.component.css']
})
export class GreenCoffeeForSaleDetailsComponent implements OnInit {

  items: GalleryItem[];
	appLanguage?: any;
	procuredActive:any =0;

	public data = [
		{
		  srcUrl: 'assets/images/galleria-1.jpg',
		  previewUrl: 'assets/images/thumbnail-4.jpg'
		},
		{
		  srcUrl: 'assets/images/galleria-2.png',
		  previewUrl: 'assets/images/thumbnail-2.jpg'
		},
		{
		  srcUrl: 'assets/images/galleria-3.png',
		  previewUrl: 'assets/images/thumbnail-3.jpg'
		},
		{
		  srcUrl: 'assets/images/galleria-4.png',
		  previewUrl: 'assets/images/thumbnail-1.jpg'
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
  constructor(public gallery: Gallery, public lightbox: Lightbox,public globals: GlobalsService) { }

  ngOnInit(): void {
    this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
    const lightboxRef = this.gallery.ref('lightbox');
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
      });
	  lightboxRef.load(this.items);
	  this.language();
    }
	language(){
		this.appLanguage = this.globals.languageJson;
	   	this.procuredActive++;
	  }

}
