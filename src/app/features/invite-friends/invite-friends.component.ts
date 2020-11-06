import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.css']
})
export class InviteFriendsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  
    /*Onboarding start*/
    $('body').on('click', '.add-partner', function () {

      var NewRow = `<div class="new-row position-relative">
			<div class="row">
			
				<div class="col-12 col-md-6 Onboard-input">

					<label class="w-100">Email address</label>
					<input class="w-100" type="email" placeholder="Please enter your work email">

        </div>
        <span class="delete-rows fnt-muli fnt-700 txt-clr60b">
				Delete row
			</span>
			</div>
		
		</div>`
      $(this).parents('.Onboard-rows').find('.Onboard-rows__inputs:last').append(NewRow);
    });

    $('body').on('click', '.delete-rows', function () {


      $(this).parents('.new-row').remove();
    });
    /*Onboarding end */
  }

}
