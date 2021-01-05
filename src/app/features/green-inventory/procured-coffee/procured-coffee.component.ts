import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-procured-coffee',
  templateUrl: './procured-coffee.component.html',
  styleUrls: ['./procured-coffee.component.css']
})
export class ProcuredCoffeeComponent implements OnInit {
	items: GalleryItem[];
	appLanguage?: any;
	procuredActive:any =0;
	orderID:any='';
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
	roaster_id:any='';
	orderDetails:any;
	public coffeedata: any[] = [
		{  estatename: 'Finca La Pampa', name: 'Organic washed Micro-lot',origin:'Colombia', species: 'Bourbon', price: '$7.4 USD / kg',quantity:'287 bags','image':'/assets/images/sourcing-image1.jpg',score:'84.5' },
		{  estatename: 'Gesha', name: 'Blend washed',origin:'Colombia',species: 'Bourbon', price: '$5.53USD / kg',quantity:'297 bags','image':'/assets/images/sourcing-image3.jpg',score:'88' },
		{  estatename: 'Finca La Toboba', name: 'FTO blend',origin:'Ethopia', species: 'Bourbon', price: '$8.92 USD /kg',quantity:'567 bags','image':'/assets/images/sourcing-image7.jpg',score:'81.5' },
		// {  estatename: 'Asoproaaa', name: 'Mebratu', origin:'Brazil',species: 'Bourbon', price: '$7.4 USD / kg',quantity:'953 bags','image':'/assets/images/sourcing-image5.jpg',score:'85.4' },
		// {  estatename: 'Cafe Directo', name: 'FTO Semi washed', origin:'Ethopia',species: 'Bourbon', price: '$5.6 USD / kg',quantity:'110 bags','image':'/assets/images/sourcing-image4.jpg',score:'82' },
		// {  estatename: 'La Isabela', name: 'Blend1',origin:'Colombia', species: 'Bourbon', price: '$8.92 USD /kg',quantity:'450 bags','image':'/assets/images/sourcing-image8.jpg',score:'84' }
  	];
  constructor(public gallery: Gallery, public lightbox: Lightbox, public globals: GlobalsService,
		public route: ActivatedRoute, public roasterService:RoasterserviceService, public cookieService: CookieService) {
			this.roaster_id = this.cookieService.get('roaster_id');
		 }

  	ngOnInit(): void {
		this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
		const lightboxRef = this.gallery.ref('lightbox');
		lightboxRef.setConfig({
			imageSize: ImageSize.Cover,
			thumbPosition: ThumbnailsPosition.Top
		});
		lightboxRef.load(this.items);
		this.language();
		this.getOrderDetails();
	}
	getOrderDetails(){
		this.orderID = decodeURIComponent(this.route.snapshot.queryParams['orderId']);
		this.roasterService.getProcuredCoffeeDetails(this.roaster_id, this.orderID).subscribe(
			response => {
			  console.log(response);
			  if(response['success'] && response['result']){
				  this.orderDetails = response['result'];
				  if(this.orderDetails && this.orderDetails['harvest_id']){
					this.getGCAvailableDetails(this.orderDetails['harvest_id']);
				  }  
			  }
			}, err =>{
			  console.log(err);
			}
		);	
	}
	getGCAvailableDetails(harvest_id){
		this.roasterService.getGCAvailableDetails(harvest_id).subscribe(
			response => {
				if(response && response['success'] && response['result']){
					const result = response['result']
					this.orderDetails['availability_name'] = result['name'];
					this.orderDetails['cup_score'] = result['cupping']['cup_score'];
					this.orderDetails['altitude'] = result['min_altitude'] + '-' + result['max_altitude'];
					this.orderDetails['flavour_profile'] = result['flavours'];
					this.orderDetails['wet_mill'] = result['wet_milling']['name'];
					this.orderDetails['processing'] = result['processing_types'];					
				}
			}, err =>{
			  console.log(err);
			}
		);
	}
	language(){
		this.appLanguage = this.globals.languageJson;
	   	this.procuredActive++;
	}
}
