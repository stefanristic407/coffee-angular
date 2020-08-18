import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { webSocket, WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service'
import { environment } from 'src/environments/environment';


import { ToastrService } from 'ngx-toastr';
declare var $: any;
let sd;
@Component({
	selector: 'app-direct-messaging',
	templateUrl: './direct-messaging.component.html',
	styleUrls: ['./direct-messaging.component.css']
})
export class DirectMessagingComponent implements OnInit {
	files: any;
	fileEvent: any;
	fileValue: any;
	modalRef: BsModalRef;
	valurl: any = '';
	roaster_id: any;
	subject: any; // Real time messaging variable
	wsURL: any;
	threadsData: any;
	threadsMessageData: any;
	activeThread: any;
	currentUser: any;
	activeThreadName: any;
	threadCurrentUser: any;
	searchText: any;
	searchResult: any;
	keyword: string;
	threadLastMessages : any;
	constructor(
		private modalService: BsModalService,
		private toastrService: ToastrService,
		private cookieService: CookieService,
		private userSevice: UserserviceService,
		private roasterService: RoasterserviceService
	) {
		this.keyword = 'firstname'
		this.wsURL = environment.wsEndpoint;
		this.roaster_id = this.cookieService.get("roaster_id");
		this.subject = webSocket(`${this.wsURL}/ro/${this.roaster_id}/messaging`);
		console.log(this.subject);
		this.currentUser = "";
		this.threadsMessageData = {};
		var authCheck = {};
		this.threadCurrentUser = "";
		authCheck['timestamp'] = this.getTimestamp();
		authCheck['type'] = "auth";
		authCheck['data'] = {};
		authCheck['data']['user_token'] = this.cookieService.get("Auth");
		this.threadLastMessages = {};
		this.subject.next(authCheck);
		this.subject.subscribe(
			msg => {
				if (msg['type'] == "history") {
					if (msg['data'] != null) {
						this.getCurrentUser(this.activeThread);
						var currentUser = this.threadCurrentUser;
						this.threadsMessageData[this.activeThread] = [];
						var temp = [];
						temp = msg['data'].reverse();
						temp.forEach(element => {
							element['currentUser'] = currentUser;
							this.threadsMessageData[this.activeThread].push(element);
						});
					}
					var allMessages = $('.live-chat-message-body');
					allMessages.scrollTop = allMessages.scrollHeight;
				} else if (msg['type'] == "threads") {
					//Get all threads for logged in user
					this.threadsData = [];
					if (msg['data'] != null) {
						msg['data'].forEach(element => {
							var nameCheck = element.name;
							if(nameCheck.indexOf("D:") != -1){
								var firstArray = nameCheck.split(":");
								var usersArray = firstArray[1].split("-");
								usersArray.forEach(userElement => {
									var userDetails = userElement.split("|");
									if(userDetails[0] != this.cookieService.get('user_id')){
										element['name'] = userDetails[1];
									}
								});
								this.threadsData.push(element);
								this.threadsMessageData[element['id']] = [];
								this.threadLastMessages[element['id']] = {};
								this.threadLastMessages[element['id']]['content'] = element['content'];
								this.threadLastMessages[element['id']]['created_at'] = element['created_at'];
							}
						});
					} else {
						this.threadsData = null;
					}
				} else if(msg['type'] == 'new-thread'){
					var nameCheck = msg['data']['name'];
					if(nameCheck.indexOf("D:") != -1){
						var firstArray = nameCheck.split(":");
						var usersArray = firstArray[1].split("-");
						usersArray.forEach(userElement => {
							var userDetails = userElement.split("|");
							if(userDetails[0] != this.cookieService.get('user_id')){
								msg['data']['name'] = userDetails[1];
							}
						});
						this.threadsData.push(msg['data']);
						this.threadsMessageData[msg['data']['id']] = [];
					}
				} else if (msg['type'] == 'message') {
					if (msg['data'] != null) {
						var currentThreadId = msg['data']['thread_id'];
						console.log(this.threadsMessageData[currentThreadId]);
						msg['data']['currentUser'] = msg['data']['currentUser'];
						this.threadsMessageData[currentThreadId].push(msg['data']);
						this.threadLastMessages[currentThreadId]['content'] = msg['data']['content'];
						this.threadLastMessages[currentThreadId]['created_at'] = msg['data']['created_at'];
						if(this.activeThread != currentThreadId){
							var audio = new Audio("assets/sounds/notification.mp3");
							audio.play();
						}
						
					}
					var allMessages = $('.live-chat-message-body');
					allMessages.scrollTop = allMessages.scrollHeight;
				}
			}, // Called whenever there is a message from the server.
			err => {
				console.log(err)
			}, // Called if at any point WebSocket API signals some kind of error.
			() => {
				console.log('complete')
			} // Called when connection is closed (for whatever reason).
		);

		//Getting All threads

		var allThreadsInfo = {};
		allThreadsInfo['type'] = "threads",
			allThreadsInfo['timestamp'] = this.getTimestamp();
		this.subject.next(allThreadsInfo);
	}

	@ViewChild('deletetemplate') private deletetemplate: any;
	@ViewChild('reporttemplate') private reporttemplate: any;

	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}

	getCurrentUser(threadId: any){
		this.threadsData.forEach(element => {
			if(element['id'] == threadId){
				this.threadCurrentUser  = element['member_id'];
			}
		});
	}

	getChatHistory(id: any, threadData: any) {
		this.activeThread = id;
		this.activeThreadName = threadData.name;
		var query = {
			"type": "history",
			"timestamp": this.getTimestamp(),
			"data": { "thread_id": id }
		};
		this.subject.next(query);
		$('.account').parents('.chat-box').find('.live-chat').toggleClass('active');
		$('.account').parents('.chat-box').find('.chat-accounts__body').toggleClass('active');
		var headerHeight = parseInt($("header").outerHeight());
		var height1 = parseInt($('.chat-accounts__head').outerHeight());
		var height2 = parseInt($('.live-caht__head').outerHeight());
		var height3 = parseInt($('.messag-form').outerHeight());
		var TotalHeight = height1 + height2 + height3 + headerHeight + 'px';
		var Ht = "calc(100vh -" + " " + TotalHeight + ")";
		$('.live-chat-message-body').css({
			"height": Ht
		});


		if ($(window).width() < 767) {
			TotalHeight = height1 + height2 + height3 + 'px';
			Ht = "calc(100vh -" + " " + TotalHeight + ")";
			$('.live-chat-message-body').css({
				"height": Ht
			})
				;
		}

		if (!($('.chat').hasClass('expand-active'))) {
			$('.chat-control__expand').show();
		}



	}

	ngOnInit(): void {
	}
	deleteChat() {
		this.openModal(this.deletetemplate);
	}
	reportChat() {
		this.openModal(this.reporttemplate);
	}

	getReadableTime(tTime: any) {
		var date = new Date(tTime);
		if (date.getHours() < 12) {
			return date.getHours() + ":" + date.getMinutes() + " am";
		} else if (date.getHours() == 12) {
			return date.getHours() + ":" + date.getMinutes() + " pm";
		} else {
			return (date.getHours() - 12) + ":" + date.getMinutes() + " pm";
		}

	}

	getThreadId(messageUser: any) {
		var threadID = "";
		this.threadsData.forEach(element => {
			if(element.members == undefined){
				threadID = this.activeThread;
			} else {
				element.members.forEach(elementMember => {
					if (elementMember['id'] == messageUser) {
						threadID = element['id'];
					}
				});
			}
			
		});
		return threadID;
	}

	// Send Messages
	sendMessage() {
		let messages = document.querySelector('.live-chat-message-body');
		let HideWords = ['fuck', 'suck', 'slap', 'kick',]
		// imageUploader();
		var ChatText = $('.send-message__btn').parents('.live-chat').find('.chat-inputs').find('.chat-inputs__text').val();
		var ChatImg = $('.send-message__btn').parents('.live-chat').find('.files').val();
		var sendMessageObject = {
			"type": "message",
			"data":
			{
				"thread_id": this.activeThread,
				"content": ChatText
			}
			,
			"timestamp": "2020-06-07 12:24:45.345"
		}
		$('.send-message__btn').parents('.live-chat').find('.chat-inputs').find('.chat-inputs__text').val('');
		this.subject.next(sendMessageObject);
		var allMessages = $('.live-chat-message-body');
		allMessages.scrollTop = allMessages.scrollHeight;
	}

	ngAfterViewInit() {
		let messages = document.querySelector('.live-chat-message-body');
		let img;
		$('body').on('input', '.live-chat .files', function (e) {
			if (e.target.files) {
				var reader = new FileReader();
				reader.readAsDataURL(e.target.files[0]);
				reader.onload = (event: any) => {
					// img = event.target.result;


					img = '<img src=' + event.target.result + ' style="width: 250px;height:250px;object-fit:cover">';
					$(this).parents('.live-chat').find('.img-container').append(img)
					$(this).parents('.live-chat').find('.img-container').show();
					$(this).parents('.live-chat').find('.img-container').find('img').not(':first').remove();
				}
			}
		});


		$(document).ready(function () {
			var height1 = parseInt($('.chat-accounts__head').outerHeight());
			var height2 = parseInt($('.live-caht__head').outerHeight());
			var height3 = parseInt($('.messag-form').outerHeight());
			var TotalHeight = height1 + height2 + height3 + 'px';
			var Ht = "calc(100vh -" + " " + TotalHeight + ")";
			$('.live-chat-message-body').css({
				"height": Ht
			})


			var w2 = parseInt($('.container').css('margin-left'));
			var p2 = parseInt($('.container').css('padding-left'));
			var contWidth = parseInt($('.container').width());
			var tw = (contWidth + (-45) + "px");
			$('.chat').css({
				"width": tw
			})

		});

		let HideWords = ['fuck', 'suck', 'slap', 'kick',]
		let AccontsNames = [];
		let accountsName = document.querySelectorAll('.account')

		$('.search-account__input').on('input', function (event) {
			var SearchItem = $(this).val().toLowerCase();;
			for (var x = 0; x < accountsName.length; x++) {
				var itemVal = accountsName[x].querySelector('.name') as HTMLElement;
				var result = accountsName[x].querySelector('.name').innerHTML.toLowerCase();
				var foundItem = result.indexOf(SearchItem) !== -1;

				if (foundItem) {
					$("." + result).css('display', 'block');
					$(".chat-profile__time" ).css('display', 'none');
					$(".chat-messaged" ).css('display', 'none');
				}
				
				else {
					$("." + result).css('display', 'none');
					// $(".chat-profile__time" ).css('display', 'inline-block');
					// $(".chat-messaged" ).css('display', 'inline-block');
				}

				if($(this).val() == 0){
					$(".chat-profile__time" ).css('display', 'inline-block');
					$(".chat-messaged" ).css('display', 'inline-block');
					
				}

			}
			event.stopImmediatePropagation();
		});



		$('body').on('click', '.start-messaging', function (event) {
			$('.chat').addClass('open');
			var headerHeight = parseInt($("header").outerHeight());
			var ReponsiveHeight = headerHeight + "px"

			if ($(window).width() > 767) {
				$('.chat').css({
					"height": "calc(100vh -" + " " + ReponsiveHeight + ")",
					top: ReponsiveHeight
				})
			}

			event.stopImmediatePropagation();
		});

		$('.done').ready(function () {
			var messages = $('.live-chat-message-body');
			messages.scrollTop = messages.scrollHeight;
		});



		$('body').on('click', '.chat-control__close', function (event) {
			$(this).parents('.chat').removeClass('open');
			event.stopImmediatePropagation();
		});




		// Back to account list
		$('body').on('click', '.back-to-accounts', function (event) {
			$('.live-chat .files').val('');
			$('.chat-control__expand').hide();
			$(this).parents('.chat').find('.live-chat').toggleClass('active');
			$(this).parents('.chat').find('.chat-accounts__body').toggleClass('active');
			event.stopImmediatePropagation();
		});

		//Expand chat
		$('body').on('click', '.chat-control__expand', function (event) {

			$(this).hide();
			$(this).parents('.chat').find('.chat-body__expand').html('');
			$(this).parents('.chat').toggleClass('expand-active');
			var expandChat = $('.live-chat.active').clone();
			$('.live-chat.active').remove();
			$(this).parents('.chat').find('.chat-body__expand').append(expandChat)
			$('.chat-accounts').find('.chat-accounts__body').toggleClass('active');
			$('.chat-accounts').find('.live-chat').toggleClass('active');
			var headerHeight = parseInt($("header").outerHeight());
			var height1 = parseInt($('.chat-accounts__head').outerHeight());
			var height2 = parseInt($('.live-caht__head').outerHeight());
			var height3 = parseInt($('.messag-form').outerHeight());
			var TotalHeight = height1 + height2 + height3 + headerHeight + 'px';
			var Ht = "calc(100vh -" + " " + TotalHeight + ")";
			$('.live-chat-message-body').css({
				"height": Ht
			});
			$('.chat-box').css({
				"height": "calc(100vh - 75px)"
			})



			if ($(window).width() < 767) {
				TotalHeight = height1 + height2 + height3 + headerHeight + 85 + 'px';
				Ht = "calc(100vh -" + " " + TotalHeight + ")";
				$('.live-chat-message-body').css({
					"height": Ht
				})
			}


			if (!($('.chat').hasClass('expand-active'))) {
				$(this).parents('.chat').find('.chat-body__expand').html('');
			}
			messages = document.querySelector('.live-chat-message-body');
			scrollToBottom();



			event.stopImmediatePropagation()
		});

		//Shrink Mode
		$('body').on('click', '.back-to-shrinkMode', function (event) {
			var chtbody = $(this).parents('.chat').find('.chat-accounts').find('.chat-accounts__body');
			$('.chat-control__expand').show();
			var shrinkChat = $(this).parents('.chat').find('.chat-body__expand').find('.live-chat.active').clone();
			$('.live-chat.active').remove();
			$(this).parents('.chat').toggleClass('expand-active');
			$(this).parents('.chat').find('.chat-accounts').append(shrinkChat);
			$(this).parents('.chat').find('.chat-accounts').find('.chat-accounts__body').removeClass('active');
			$(this).parents('.chat').find('.chat-accounts').find('.live-chat').addClass('active')
			var headerHeight = parseInt($("header").outerHeight());
			var height1 = parseInt($('.chat-accounts__head').outerHeight());
			var height2 = parseInt($('.live-caht__head').outerHeight());
			var height3 = parseInt($('.messag-form').outerHeight());
			var TotalHeight = height1 + height2 + height3 + headerHeight + 'px';
			var Ht = "calc(100vh -" + " " + TotalHeight + ")";
			$('.live-chat-message-body').css({
				"height": Ht
			});
			$('.chat-box').css({
				"height": "100vh"
			})
			if ($(window).width() < 767) {
				TotalHeight = height1 + height2 + height3 + headerHeight + 75 + 'px';
				Ht = "calc(100vh -" + " " + TotalHeight + ")";
				$('.live-chat-message-body').css({
					"height": Ht
				})
			}

			$('.live-chat .files').val('');
			messages = document.querySelector('.live-chat-message-body');
			scrollToBottom();


			event.stopImmediatePropagation();
		});

		$('body').on('click', '.chat-inputs__img', function (event) {
			event.stopImmediatePropagation();
		});


		$('body').on('click', '.img-container__remove', function (event) {
			sd = '';
			$('.live-chat .files').val('');
			$(this).parents('.img-container').hide();
			$(this).parents('.img-container').find('img').remove();
			event.stopImmediatePropagation();
		});

		$('body').on('click', '.back-to-conversation', function (event) {
			$(this).parents('.account-setting').removeClass('open');
			event.stopImmediatePropagation();
		});

		$('body').on('click', '.live-chat.active .chat-img-name', function (event) {
			var height1 = parseInt($('.live-caht__head').outerHeight());
			$(this).parents('.chat').find('.account-setting').addClass('open');
			var Ht = "calc(100vh -" + " " + height1 + "px" + ")";
			var tp = height1 + "px"
			$(this).parents('.chat').find('.account-setting').css({
				"height": Ht,
				"top": tp
			})
			event.stopImmediatePropagation();
		});

		$('body').bind('keypress', function (e) {
			if (e.keyCode == 13) {
				$('.send-message__btn').trigger('click');
			}
			e.stopImmediatePropagation();
		});

		//Click to change notification in chat setting
		$('body').on('change', '.notification-control input[type="radio"]', function () {
			var $thisVal = $(this).val();
			if ($thisVal == 'off') {
				$(this).parents('.notification-control').find('.switch-control').removeClass("active");
				$(this).parents('.notification-control').removeClass("active");
			}

			else if ($thisVal == 'on') {
				$(this).parents('.notification-control').find('.switch-control').addClass("active");
				$(this).parents('.notification-control').addClass("active");
			}
		});


		function scrollToBottom() {
			messages.scrollTop = messages.scrollHeight;
		}

		scrollToBottom();

	}

	scrollToBottom() {
		var messages = $('.live-chat-message-body');
		messages.scrollTop = messages.scrollHeight;
	}

	//Autocomplete codes
	selectEvent(item: any) {
		// do something with selected item
		var threadName = "D:" + this.cookieService.get('user_id') + "|" + this.cookieService.get('name');
		threadName += "-" + item.id + "|" + item.firstname + " " + item.lastname;

		var createThreadData = {};
		createThreadData['type'] = "create";
		createThreadData['data'] = {};
		createThreadData['data']['name'] = threadName;
		createThreadData['data']['members'] = [];
		var userData = {};
		userData['user_id'] = item['id'];
		userData['org_type'] = item['organization_type'].toLowerCase();
		userData['org_id'] = item['organization_id'];
		createThreadData['data']['members'].push(userData);
		createThreadData['timestamp'] = this.getTimestamp();
		this.subject.next(createThreadData);
	}

	onChangeSearch(val: string) {
		if (val.length > 2) {
			this.userSevice.searchUser(val).subscribe(resultData => {
				this.searchResult = resultData['result'];
				console.log(this.searchResult);
			})
		}
		// fetch remote data from here
		// And reassign the 'data' which is binded to 'data' property.
	}

	onFocused(e: any) {
		//console.log(e);
		// do something when input is focused
	}

	getTimestamp() {
		var date = new Date();
		var utcDateTime = date.getUTCDate() + "-" + date.getMonth() + "-" + date.getUTCFullYear();
		utcDateTime += " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds() + "." + date.getUTCMilliseconds();
		return utcDateTime;
	}

	showContent(content: any){
		if(content.length > 40){
			return content.slice(0, 40) + "..";
		} else {
			return content;
		}
		
	}

	getOrganization(orgType: any){
		if(orgType == "" || orgType == "sa"){
			return "SEWN Admin";
		}
		if(orgType == "ro"){
			return "Roaster";
		}
		if(orgType == "fc"){
			return "Facilitator";
		}
		if(orgType == "es"){
			return "Estates";
		}
		return "Unknown";
	}

}
