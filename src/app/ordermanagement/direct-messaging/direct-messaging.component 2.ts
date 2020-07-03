import { Component, OnInit } from '@angular/core';
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
	fileValue : any;
	valurl:any = '';

  constructor(private toastrService : ToastrService) { 
  }

  ngOnInit(): void {
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
		this.valurl = event.target.result;
		// console.log(this.valurl);
		this.fileValue = '<img src="' + this.valurl + '" height="200">';
		console.log(this.fileValue);
		$('.imageFile').append(this.fileValue);
		 sd = this.fileValue;
		
	  }
	 
	}
	
  }
  
  ngAfterViewInit() {
  

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
		var tw = (contWidth + (-45) +"px");
		$('.chat').css({
			"width": tw
		})

	});

	let sd;
	let HideWords = ['fuck', 'suck']
	let AccontsNames = [];
	let accountsName = document.querySelectorAll('.account')


	$('.search-account__input').on('input', function (event) {
		var SearchItem = $(this).val().toLowerCase();;
		for (var x = 0; x < accountsName.length; x++) {
      var itemVal = accountsName[x].querySelector('.name') as HTMLElement;
			var result = accountsName[x].querySelector('.name').innerHTML.toLowerCase();
			var foundItem = result.indexOf(SearchItem) !== -1;

			if (foundItem) {
				// itemVal.style.display  = "block";
				$("."+result).css('display', 'block');
			}
			else {
				// itemVal.style.display = "none";
				$("."+result).css('display', 'none');
			}
		}
		event.stopImmediatePropagation();
	});




	// //image upload function
	// function imageUploader() {
	// 	var filesInputLength = document.getElementsByClassName("files").length;
	// 	//Check File API support
	// 	if (window.File && window.FileList && window.FileReader) {
	// 		for (var j = 0; j < filesInputLength; j++) {
	// 			var filesInput = document.getElementsByClassName("files")[j];
	// 			// filesInput.addEventListener("change", function (event) {
	// 				function handleFile(event){
	// 				// var files = event.target.files; //FileList object
	// 				for (var i = 0; i < 1; i++) {
	// 					var file = event.target.files[i];
	// 					//Only pics
	// 					if (!file.type.match('image'))
	// 						continue;
	// 					var picReader = new FileReader();
	// 					picReader.addEventListener("load", function (event) {

	// 						var picFile = event.target;
	// 						sd = "<img style='width:100%;height:auto;' class='thumbnail chat-images' src='" + picFile.result + "'" +
	// 							"title='" + picFile + "'/>";

	// 						if (i == 1) {
	// 							$('.img-container').append(sd)
	// 							$('.img-container').show();
	// 							$('.img-container').find('img').not(':first').remove();;
	// 						}

	// 					}
	// 					//Read the image
	// 					picReader.readAsDataURL(file);
	// 				}

	// 			});
	// 		}
	// 	}
	// 	else {
	// 		console.log("Your browser does not support File API");
	// 	}
	// }



	// imageUploader();

	$('body').on('click', '.start-messaging', function (event) {
		$('.chat').addClass('open');
		var headerHeight = parseInt($("header").outerHeight());
        var ReponsiveHeight = headerHeight + "px"
        $('.chat').css({
            "height": "calc(100vh -" + " " + ReponsiveHeight + ")",
            top: ReponsiveHeight
        })

		event.stopImmediatePropagation();
	});



	$('body').on('click', '.chat-control__close', function (event) {
		$(this).parents('.chat').removeClass('open');
		event.stopImmediatePropagation();
	});


	// Send Messages
	$('body').on('click', '.send-message__btn', function (event) {
		console.log(sd)

		// imageUploader();
		var ChatText = $(this).parents('.live-chat').find('.chat-inputs').find('.chat-inputs__text').val();

		var ChatImg = $('.files').val();
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

			var message = '<div class="message-to live-chat-message-body__text"><div class="message-body"><div>' + sd + '</div><div class="message-to__text "><span>' + ChatText + '</span></div></div><p class="live-time">' + strTime + '</p></div>'
			var mesbdy = $(this).parents('.live-chat').find('.live-chat-message-body').append(message)
			var clrInput = $(this).parents('.live-chat').find('.chat-inputs').find('.chat-inputs__text').val('');

			$('.files').val('');
			$(".live-chat-message-body").animate({ scrollTop: $(".live-chat-message-body__text:last").offset().top });

		}


		else if ((ChatText !== '' && ChatImg == '')) {
			var message = '<div class="message-to live-chat-message-body__text"><div class="message-body"><div class="message-to__text"><span>' + ChatText + '</span></div></div><p class="live-time">' + strTime + '</p></div>'
			var mesbdy = $(this).parents('.live-chat').find('.live-chat-message-body').append(message)
			var clrInput = $(this).parents('.live-chat').find('.chat-inputs').find('.chat-inputs__text').val('');

			$(".live-chat-message-body").animate({ scrollTop: $(".live-chat-message-body__text:last").offset().top });

		}

		else if ((ChatText == '' && ChatImg !== '')) {

			var message = '<div class="message-to live-chat-message-body__text"><div class="message-body"><div>' + sd + '</div></div><p class="live-time">' + strTime + '</p></div>'
			var mesbdy = $(this).parents('.live-chat').find('.live-chat-message-body').append(message)
			var clrInput = $(this).parents('.live-chat').find('.chat-inputs').find('.chat-inputs__text').val('');

			$('.files').val('');
			$(".live-chat-message-body").animate({ scrollTop: $(".live-chat-message-body__text:last").offset().top });

		}

		else {
			return false;
		}

		$('.img-container').hide();
		$('.img-container').find('img').remove();
		event.stopImmediatePropagation();
	});

	// Back to account list
	$('body').on('click', '.back-to-accounts', function (event) {
		// imageUploader();
		$('.files').val('');
		$('.chat-control__expand').hide();
		$(this).parents('.chat').find('.live-chat').toggleClass('active');
		$(this).parents('.chat').find('.chat-accounts__body').toggleClass('active');
		event.stopImmediatePropagation();
	});


	// Click on account to start chart
	$('body').on('click', '.account', function (event) {
		// imageUploader();

		$(this).parents('.chat-box').find('.live-chat').toggleClass('active');
		$(this).parents('.chat-box').find('.chat-accounts__body').toggleClass('active');
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
			TotalHeight = height1 + height2 + height3 + headerHeight + 75 + 'px';
			Ht = "calc(100vh -" + " " + TotalHeight + ")";
			console.log(Ht)
			$('.live-chat-message-body').css({
				"height": Ht
			})
		;
		}

		if (!($('.chat').hasClass('expand-active'))) {
			$('.chat-control__expand').show();
		}
		event.stopImmediatePropagation();
	});

	//Expand chat
	$('body').on('click', '.chat-control__expand', function (event) {
		$('.files').val('');
		// imageUploader();
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
		var TotalHeight = height1 + height2 + height3 + headerHeight +'px';
		var Ht = "calc(100vh -" + " " + TotalHeight + ")";
		$('.live-chat-message-body').css({
			"height": Ht
		});
		$('.chat-box').css({
            "height": "calc(100vh - 75px)"
		})
		if($(".live-chat-message-body__text:last").offset() !== undefined)
			$(".live-chat-message-body").animate({ scrollTop: $(".live-chat-message-body__text:last").offset().top });


		if ($(window).width() < 767) {
			TotalHeight = height1 + height2 + height3 + headerHeight + 85 + 'px';
			Ht = "calc(100vh -" + " " + TotalHeight + ")";
			console.log(Ht)
			$('.live-chat-message-body').css({
				"height": Ht
			})
		}


		if (!($('.chat').hasClass('expand-active'))) {
			$(this).parents('.chat').find('.chat-body__expand').html('');
		}

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
			console.log(Ht)
			$('.live-chat-message-body').css({
				"height": Ht
			})
		}



		$('.files').val('');
		// imageUploader();
		// if (($(chtbody).hasClass('active'))) {
		// 	$('.chat-control__expand').hide();
		// }
		if($(".live-chat-message-body__text:last").offset() !== undefined)
			$(".live-chat-message-body").animate({ scrollTop: $(".live-chat-message-body__text:last").offset().top });
		event.stopImmediatePropagation();
	});

	$('body').on('click', '.chat-inputs__img', function (event) {
		// imageUploader();
		event.stopImmediatePropagation();
	});


	$('body').on('click', '.img-container__remove', function (event) {
		sd = '';
		$('.files').val('');
		$(this).parents('.img-container').hide();
		$(this).parents('.img-container').find('img').remove();
		event.stopImmediatePropagation();
	});
	
	$('body').on('click', '.back-to-conversation', function (event) {
		$(this).parents('.account-setting').removeClass('open');
		event.stopImmediatePropagation();
	});

	$('body').on('click', '.chat-seeting', function (event) {
		$(this).parents('.chat').find('.account-setting').addClass('open');
		event.stopImmediatePropagation();
	});

	$('body').bind('keypress', function(e) {
		if(e.keyCode==13){
			$('.send-message__btn').trigger('click');
		}
		e.stopImmediatePropagation();
	});

  }

}
