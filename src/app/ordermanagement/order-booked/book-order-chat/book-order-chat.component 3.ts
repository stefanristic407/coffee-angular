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
    //image upload function
	function imageUploader() {
		var filesInputLength = document.getElementsByClassName("files").length;
		//Check File API support
		if (window.File && window.FileList && window.FileReader) {
			for (var j = 0; j < filesInputLength; j++) {
				var filesInput = document.getElementsByClassName("files")[j];
				filesInput.addEventListener("change", function (event) {
          var fileVal = event.target as HTMLInputElement;
          var files:File = (fileVal.files as FileList)[0]; //FileList object
					// var files = event.target.files; //FileList object
          for (var i = 0; i < files[0].length; i++) {
						var file = files[i];
						//Only pics
						if (!file.type.match('image'))
							continue;
						var picReader = new FileReader();
						picReader.addEventListener("load", function (event) {

							var picFile = event.target;
							sd = "<img class='thumbnail chat-images' src='" + picFile.result + "'" +
              "title='" + picFile[0].name + "'/>";

                if (i == files[0].length) {
								$('.img-container').append(sd)
								$('.img-container').show();
								$('.img-container').find('img').not(':first').remove();;
							}

						});
						//Read the image
						picReader.readAsDataURL(file);
					}

				});
			}
		}
		else {
			console.log("Your browser does not support File API");
		}
	}



    //Send Message
    // Send Messages
	$('body').on('click', '.send-message__btn', function () {
		imageUploader();
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


            var message = '<div class="main-message message-from"><div class="main-message__profile clearfix"><div class="float-left img"><img src="../images/dispute-order/profile.png"></div><div class="profile-name"><div class="float-left"><h4 class="name">Finca La Pampa</h4><span class="status">Facilitator</span></div></div></div><div class="message-info"><div class="message-info__body position-relative"><span class="live-time">' + strTime + '</span><div class="message-info__img">' + sd + '</div><p class="message-text">' + ChatText + '</p></div></div></div>'

			var mesbdy = $(this).parents('.dispute-order').find('.conversatio-body__messages').append(message)
			var clrInput = $(this).parents('.dispute-order').find('.chat-inputs').find('.chat-inputs__text').val('');

			$('.files').val('');
			$(".conversatio-body__messages").animate({ scrollTop: $(".main-message:last").offset().top });

		}


		else if ((ChatText !== '' && ChatImg == '')) {
            var message = '<div class="main-message message-to"><div class="main-message__profile clearfix"><div class="float-left img"><img src="../images/dispute-order/profile.png"></div><div class="profile-name"><div class="float-left"><h4 class="name">Finca La Pampa</h4><span class="status">Facilitator</span></div></div></div><div class="message-info"><div class="message-info__body position-relative"><span class="live-time">' + strTime + '</span><p class="message-text">' + ChatText + '</p></div></div></div>'


            var mesbdy = $(this).parents('.dispute-order').find('.conversatio-body__messages').append(message)
            var clrInput = $(this).parents('.dispute-order').find('.chat-inputs').find('.chat-inputs__text').val('');

			$('.files').val('');
			$(".conversatio-body__messages").animate({ scrollTop: $(".main-message:last").offset().top });

		}

		else if ((ChatText == '' && ChatImg !== '')) {

            var message = '<div class="main-message message-from"><div class="main-message__profile clearfix"><div class="float-left img"><img src="../images/dispute-order/profile.png"></div><div class="profile-name"><div class="float-left"><h4 class="name">Finca La Pampa</h4><span class="status">Facilitator</span></div></div></div><div class="message-info"><div class="message-info__body position-relative"><span class="live-time">' + strTime + '</span><div class="message-info__img">' + sd + '</div></div></div></div>'


            var mesbdy = $(this).parents('.dispute-order').find('.conversatio-body__messages').append(message)
            var clrInput = $(this).parents('.dispute-order').find('.chat-inputs').find('.chat-inputs__text').val('');
            $('.files').val('');
            $(".conversatio-body__messages").animate({ scrollTop: $(".main-message:last").offset().top });


		}

		else {
			return false;
		}

		$('.img-container').hide();
		$('.img-container').find('img').remove();

	});


    $('body').on('click', '.chat-inputs__img', function () {
		imageUploader();
	

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
