import { Component, OnInit } from '@angular/core';
declare var $: any;
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-order-chat',
	templateUrl: './order-chat.component.html',
	styleUrls: ['./order-chat.component.css']
})
export class OrderChatComponent implements OnInit {
	appLanguage?: any;
	ChatSampleActive: any = 0;
	greenIconShow: boolean = false;
	orderID: string = '';
	orderDetails: any = {};
	orderDisputes: any = [];
	roaster_id: string = '';
	isView: boolean = true;
	currentDispute_id: string = '';
	showResolveBtn: boolean = false;
	showEscalateBtn: boolean = false;
	currentDispute: any;
	roasterName: string = '';
	orderType: string = '';

	constructor(public globals: GlobalsService, private route: ActivatedRoute,
		public roasterService: RoasterserviceService, public cookieService: CookieService,
		private toasterService: ToastrService) { }

	ngOnInit(): void {
		this.language();
		this.roaster_id = this.cookieService.get('roaster_id');
		this.roasterName = this.cookieService.get('name');
		this.orderID = decodeURIComponent(this.route.snapshot.queryParams['id']);
		this.currentDispute_id = this.route.snapshot.queryParams['ticketId'] ? decodeURIComponent(this.route.snapshot.queryParams['ticketId']) : undefined;
		this.orderType = this.route.snapshot.queryParams['orderType'] ? decodeURIComponent(this.route.snapshot.queryParams['orderType']) : undefined;
		this.getOrderDetails();
		this.getOrderDisputes();
		// $(window).on(".conversation-head__profiles", "click", function (e) {
		// 	// $(window).trigger("click");
		// 	// $(".person-details-info").css({left: e.pageX});
		// 	//  $(".person-details-info").css({top: e.pageY});
		// 	//   $(".person-details-info").show();
		// 	alert(e.pageX);
		// });
	}
	getOrderDetails() {
		this.roasterService.getViewOrderDetails(this.roaster_id, this.orderID, this.orderType).subscribe(res => {
			console.log(res);
			if (res['success'] && res['result']) {
				this.orderDetails = res['result'];
				if (this.orderDetails['status']) {
					this.orderDetails['status'] = this.formatStatus(this.orderDetails['status']);
				}
				if (this.orderDetails['order_type']) {
					this.orderDetails['order_type'] = this.formatStatus(this.orderDetails['order_type']);
				}
				if (this.orderType == 'MR' && this.orderDetails['type']) {
					this.orderDetails['order_type'] = this.formatStatus(this.orderDetails['type']);
				}
			}
		}, err => {
			console.log(err);
		});
	}
	getOrderDisputes() {
		this.orderDisputes = [];
		this.roasterService.getOrderDisputeList(this.roaster_id, this.orderID, this.orderType).subscribe(res => {
			console.log(res);
			if (res['success'] && res['result']) {
				this.orderDisputes = res['result'];
				this.orderDisputes.forEach(ele => {
					ele['dispute_status'] = this.formatStatus(ele['dispute_status']);
					ele['dispute_type'] = this.formatStatus(ele['dispute_type']);
					if (ele['id'] == this.currentDispute_id) {
						this.clickDispute(ele);
					}
				});

			}
		}, err => {
			console.log(err);
		});
	}
	clickOrder() {
		this.currentDispute_id = '';
		this.currentDispute = undefined;
	}
	formatStatus(stringVal) {
		let formatVal = '';
		if (stringVal) {
			formatVal = stringVal.toLowerCase().charAt(0).toUpperCase() + stringVal.slice(1).toLowerCase();
			formatVal = formatVal.replace('_', ' ');
		}
		return formatVal.replace('-', '');
	}
	clickDispute(item) {
		this.currentDispute_id = item.id;
		this.showResolveBtn = item.dispute_status == 'Open' ? true : false;
		this.showEscalateBtn = item.escalated;
		this.currentDispute = item;
	}
	markResolved() {
		this.roasterService.markTicketasResolved(this.roaster_id, this.currentDispute_id).subscribe(res => {
			console.log(res);
			if (res['success']) {
				let disputeList = this.orderDisputes.find(item => item.id == this.currentDispute_id);
				this.showResolveBtn = false;
				this.toasterService.success("Successfully marked as resolved")
				if (disputeList) {
					disputeList['dispute_status'] = this.formatStatus('Resolved');
				}
			}
		}, err => {
			this.toasterService.error("Error while mark as resolve")
			console.log(err);
		});
	}
	escalateTicket() {
		this.roasterService.escalteTicket(this.roaster_id, this.currentDispute_id).subscribe(res => {
			console.log(res);
			if (res['success']) {
				this.toasterService.success("Successfully escalated a dispute");
				this.showEscalateBtn = true;
			}
		}, err => {
			this.toasterService.error("Error while escaling the dispute")
			console.log(err);
		});
	}
	ngAfterViewInit() {
		const messages = document.querySelector('.conversatio-body__messages');
		let img;
		$('body').on('input', '.share-ur-knowledge-main__submit .files', function (e) {
			if (e.target.files) {
				var reader = new FileReader();
				reader.readAsDataURL(e.target.files[0]);
				reader.onload = (event: any) => {
					// img = event.target.result;


					img = '<img src=' + event.target.result + '>';
					setTimeout(function () {
						$('.share-ur-knowledge-main__submit').find('.img-container').append(img);
						$('.share-ur-knowledge-main__submit').find('.img-container').show();
						// $(this).parents('.share-ur-knowledge-main__submit').find('.img-container').find('img').not(':first').remove();

					}, 100);

				}



			}
		});
		let searchresult = document.querySelectorAll('.search-parent')
		$('.search-messages__input').on('input', function () {
			var SearchItem = $(this).val().toLowerCase();;
			for (var x = 0; x < searchresult.length; x++) {
				var itemVal = searchresult[x] as HTMLElement;
				var result = searchresult[x].querySelector('.search-child').innerHTML.toLowerCase();
				var foundItem = result.indexOf(SearchItem) !== -1;

				if (foundItem) {

					itemVal.style.display = "block";
				}

				else {
					itemVal.style.display = "none";
				}
			}

		});


		let HideWords = ['fuck', 'suck']


		//Send Message

		// Send Messages
		$('body').on('click', '.share-ur-knowledge-main__submit .submit', function () {


			var ChatText = $(this).parents('.share-ur-knowledge-main__submit').find('.q-a-forum-input').find('.chat-inputs__text').val();

			var ChatImg = $(this).parents('.share-ur-knowledge-main__submit').find('.q-a-forum-input').find('.files').val();

			let strTime;
			function formatAMPM(date) {
				var hours = date.getHours();
				var minutes = date.getMinutes();
				var ampm = hours >= 12 ? 'pm' : 'am';
				hours = hours % 12;
				hours = hours ? hours : 12; // the hour '0' should be '12'
				minutes = minutes < 10 ? '0' + minutes : minutes;
				strTime = hours + ':' + minutes + ' ' + ampm;
				console.log(strTime)
			}

			formatAMPM(new Date);
			for (var i = 0; i <= HideWords.length; i++) {
				// var found = ChatText.includes(HideWords[i]);
				var RedText = ChatText.toLowerCase();
				var found = RedText.indexOf(HideWords[i]) !== -1;

				if (found) {
					ChatText = "*********!";
					$('.offensive-lang ').addClass('active');

					setTimeout(function () {
						$('.offensive-lang ').removeClass('active');
					}, 8000);

				}

			}

			if (ChatText !== '' && ChatImg !== '') {

				var message = '<div class="main-message message-to"><div class="main-message__profile clearfix"><div class="float-left img"><img src="assets/images/profile.png"></div><div class="profile-name"><div class="float-left"><h4 class="name">Finca La Pampa</h4><span class="status">Facilitator</span></div></div></div><div class="message-info"><div class="message-info__body position-relative"> <div class="message-info__img">' + img + '</div><p class="message-text">' + ChatText + '</p></div><span class="live-time">' + strTime + '</span></div></div>'


				var mesbdy = $(this).parents('.share-ur-knowledge-main__submit').find('.conversatio-body__messages').append(message)
				var clrInput = $(this).parents('.share-ur-knowledge-main__submit').find('.q-a-forum-input').find('.chat-inputs__text').val('');

				$('.share-ur-knowledge-main__submit .files').val('');
			}
			else if ((ChatText !== '' && ChatImg == '')) {
				var message = '<div class="main-message message-to"><div class="main-message__profile clearfix"><div class="float-left img"><img src="assets/images/profile.png"></div><div class="profile-name"><div class="float-left"><h4 class="name">Finca La Pampa</h4><span class="status">Facilitator</span></div></div></div><div class="message-info"><div class="message-info__body position-relative"><p class="message-text px-2">' + ChatText + '</p></div><span class="live-time">' + strTime + '</span></div></div>'
				var mesbdy = $(this).parents('.share-ur-knowledge-main__submit').find('.conversatio-body__messages').append(message)
				var clrInput = $(this).parents('.share-ur-knowledge-main__submit').find('.q-a-forum-input').find('.chat-inputs__text').val('');
				$('.share-ur-knowledge-main__submit .files').val('');
			}
			else if ((ChatText == '' && ChatImg !== '')) {
				var message = '<div class="main-message message-from"><div class="main-message__profile clearfix"><div class="float-left img"><img src="assets/images/profile.png"></div><div class="profile-name"><div class="float-left"><h4 class="name">Finca La Pampa</h4><span class="status">Facilitator</span></div></div></div><div class="message-info"><div class="message-info__body position-relative"><div class="message-info__img">' + img + '</div><span class="live-time">' + strTime + '</span></div></div></div>'
				var mesbdy = $(this).parents('.share-ur-knowledge-main__submit').find('.conversatio-body__messages').append(message)
				var clrInput = $(this).parents('.share-ur-knowledge-main__submit').find('.q-a-forum-input').find('.chat-inputs__text').val('');
				$('.share-ur-knowledge-main__submit .files').val('');
			}
			else {
				return false;
			}
			$('.img-container').hide();
			var shouldScroll = messages.scrollTop + messages.clientHeight === messages.scrollHeight;
			// After getting your messages.
			if (!shouldScroll) {
				scrollToBottom();
			}
		});
		$('body').on('click', '.order-status-list-close', function () {
			$(this).parents('.dispute-order__status').toggleClass('open')
		});

		$('body').on('click', '.open-order-status-list', function () {
			$('.dispute-order__status').addClass('open')
		});
		$('body').bind('keypress', function (e) {
			if (e.keyCode == 13) {

				$('.submit').trigger('click');
			}
			e.stopImmediatePropagation();
		});

		$('body').on('click', '.order-ticket-list__item', function () {
			$(this).parents('.share-ur-knowledge-main__submit').find('.dispute-order__conversation').addClass('open')
		});

		function scrollToBottom() {
			if (messages)
				messages.scrollTop = messages.scrollHeight;
		}

		scrollToBottom();
	}
	language() {
		this.appLanguage = this.globals.languageJson;
		this.ChatSampleActive++;
	}

}
