import { Component, OnInit } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-order-chat',
  templateUrl: './order-chat.component.html',
  styleUrls: ['./order-chat.component.css']
})
export class OrderChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  

  ngAfterViewInit() {
	 

	let img;
		$('body').on('input', '.files', function (e) {
			if (e.target.files) {
				var reader = new FileReader();
				reader.readAsDataURL(e.target.files[0]);
				reader.onload = (event: any) => {
					// img = event.target.result;


					img = '<img src=' + event.target.result +'>';
					
					setTimeout(function(){
						$('.img-container').append(img);
						$('.img-container').show();
						
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
	$('body').on('click', '.send-message__btn', function () {
	
	
		var ChatText = $(this).parents('.dispute-order').find('.chat-inputs').find('.chat-inputs__text').val();

		var ChatImg =  $(this).parents('.dispute-order').find('.chat-inputs').find('.files').val();
	
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
			
			var message = '<div class="main-message message-to"><div class="main-message__profile clearfix"><div class="float-left img"><img src="assets/images/profile.png"></div><div class="profile-name"><div class="float-left"><h4 class="name">Finca La Pampa</h4><span class="status">Facilitator</span></div></div></div><div class="message-info"><div class="message-info__body position-relative"> <div class="message-info__img">'+img+'</div><p class="message-text">' + ChatText + '</p></div><span class="live-time">' + strTime + '</span></div></div>'


            var mesbdy = $(this).parents('.dispute-order').find('.conversatio-body__messages').append(message)
            var clrInput = $(this).parents('.dispute-order').find('.chat-inputs').find('.chat-inputs__text').val('');

			$('.files').val('');
			$(".conversatio-body__messages").animate({ scrollTop: $(".main-message:last").offset().top });
		}


		else if ((ChatText !== '' && ChatImg == '')) {
            var message = '<div class="main-message message-to"><div class="main-message__profile clearfix"><div class="float-left img"><img src="assets/images/profile.png"></div><div class="profile-name"><div class="float-left"><h4 class="name">Finca La Pampa</h4><span class="status">Facilitator</span></div></div></div><div class="message-info"><div class="message-info__body position-relative"><p class="message-text px-2">' + ChatText + '</p></div><span class="live-time">' + strTime + '</span></div></div>'


            var mesbdy = $(this).parents('.dispute-order').find('.conversatio-body__messages').append(message)
            var clrInput = $(this).parents('.dispute-order').find('.chat-inputs').find('.chat-inputs__text').val('');

			$('.files').val('');
			$(".conversatio-body__messages").animate({ scrollTop: $(".main-message:last").offset().top });

		}

		else if ((ChatText == '' && ChatImg !== '')) {

            var message = '<div class="main-message message-from"><div class="main-message__profile clearfix"><div class="float-left img"><img src="assets/images/profile.png"></div><div class="profile-name"><div class="float-left"><h4 class="name">Finca La Pampa</h4><span class="status">Facilitator</span></div></div></div><div class="message-info"><div class="message-info__body position-relative"><div class="message-info__img">' + img + '</div><span class="live-time">' + strTime + '</span></div></div></div>'


            var mesbdy = $(this).parents('.dispute-order').find('.conversatio-body__messages').append(message)
            var clrInput = $(this).parents('.dispute-order').find('.chat-inputs').find('.chat-inputs__text').val('');
            $('.files').val('');
            $(".conversatio-body__messages").animate({ scrollTop: $(".main-message:last").offset().top });


		}

		else {
			return false;
		}

		$('.img-container').hide();
		

	});




    $('body').on('click', '.order-status-list-close', function () {
        $(this).parents('.dispute-order__status').toggleClass('open')
    });

    $('body').on('click', '.open-order-status-list', function () {
        $('.dispute-order__status').addClass('open')
    });
	$('body').bind('keypress', function (e) {
		if (e.keyCode == 13) {
			
			$('.send-message__btn').trigger('click');
		}
		e.stopImmediatePropagation();
	});
	
	$('body').on('click', '.order-ticket-list__item', function () {
        $(this).parents('.dispute-order').find('.dispute-order__conversation').addClass('open')
    });
  }

}
