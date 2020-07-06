import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-book-order-chat',
  templateUrl: './book-order-chat.component.html',
  styleUrls: ['./book-order-chat.component.css']
})
export class BookOrderChatComponent implements OnInit {

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


					img = '<img src=' + event.target.result + ' style="width: 250px;height:250px;object-fit:cover">';
					$('.img-container').append(img)
					$('.img-container').show();
					$('.img-container').find('img').not(':first').remove();
				}
			}
		});




    let searchresult = document.querySelectorAll('.search-parent')
    $('.search-messages__input').on('input', function () {
        var SearchItem = $(this).val().toLowerCase();;
        for (var x = 0; x < searchresult.length; x++) {
          var itemVal = searchresult[x].querySelector('.name') as HTMLElement;
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

    let sd;
	let HideWords = ['fuck', 'suck']
   


    //Send Message
    // Send Messages
	$('body').on('click', '.send-message__btn', function () {
		
		
		var ChatText = $(this).parents('.dispute-order').find('.chat-inputs').find('.chat-inputs__text').val();

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

			var message = '<div class="message-to live-chat-message-body__text"><div class="message-body"><div>' + img + '</div><div class="message-to__text "><span>' + ChatText + '</span></div></div><p class="live-time">' + strTime + '</p></div>'
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

			var message = '<div class="message-to live-chat-message-body__text"><div class="message-body"><div>' + img + '</div></div><p class="live-time">' + strTime + '</p></div>'
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
		

	});


    $('body').on('click', '.chat-inputs__img', function () {
		
	

	});


    $('body').on('click', '.order-status-list-close', function () {
        $(this).parents('.dispute-order__status').toggleClass('open')
    });

    $('body').on('click', '.open-order-status-list', function () {
        $('.dispute-order__status').addClass('open')
    });

    $('body').bind('keypress', function(e) {
    if(e.keyCode==13){
		
        $('.send-message__btn').trigger('click');
    }
    });
  }

}
