import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vat-micro-roaster',
  templateUrl: './vat-micro-roaster.component.html',
  styleUrls: ['./vat-micro-roaster.component.css']
})
export class VatMicroRoasterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  
    /*Onboarding start*/
    $('body').on('click', '.add-partner', function () {

      var NewRow = `<div class="new-row position-relative">
      <div class="row">
      
      <div class="col-12 col-md-4 Onboard-input">
          <label class="w-100">Country *</label>
          <select  name="Year" class="form-control select-region">
              <option  value="" selected="" disabled=""> Select a Country</option>
              <option  value="Sweden"> Sweden </option>
              <option  value="Australia"> Australia </option>
              <option  value="India"> India </option>
          </select>
      </div>
			
      <div class="col-12 col-md-4 Onboard-input">
        <label class="w-100">Transaction type *</label>
        <input class="w-100" type="text" placeholder="Please enter your type">
      </div>

      <div class="col-12 col-md-4 Onboard-input">
        <label class="w-100">Vat percentage *</label>
        <input class="w-100" type="number" placeholder="Enter percentage">
      </div>

        <span class="delete-rows fnt-muli fnt-700 txt-clr60b delete-b2b">
				Delete row
			</span>
			</div>
		
		</div>`
      $(this).parents('.Onboard-vatmr').find('.Onboard-vatmr__inputs:last').append(NewRow);
    });

    $('body').on('click', '.delete-rows', function () {


      $(this).parents('.new-row').remove();
    });
    /*Onboarding end */
  }

}
