"use strict";
(function($) {

	//определение мобилы
	function isMobile($min_pc_width = 1200) {
		if ( (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) || ($(window).width() < $min_pc_width)) {
			 	//console.log('mobile');
				$('body').addClass('viewport--mobile');
			 	return true;
			} else {
				//console.log('pc');
				$('body').removeClass('viewport--mobile');
				return false;
			}
	}
	isMobile();	$(window).resize(function() {isMobile();})



$(document).ready(function(){
// при открытии модалки выделять первый инпут поля
$('body').on('shown.bs.modal', function (el) {
	if(!isMobile()) {
		$('.modal-open .modal.show .form-control:visible:enabled:first').focus();
	}
})



window.toggleClass = function(el, $class = "active") {
	$(el).toggleClass($class);
}



$(window).on('scroll', function(event) {
		// пример использования на элементе:
		//	 data-spy="affix" data-offset-top="200" + потом прописать стили для .affix и body.affix-
		var scrollValue = $(window).scrollTop();
		  $('[data-spy="affix"]').each(function() {
				var top_offset = $(this).data('offset-top');
				if (scrollValue >= top_offset) {
					$(this).addClass('affix');
					$('body').addClass('affix-'+$(this).attr('id'));
				} else {
					$(this).removeClass('affix');
					$('body').removeClass('affix-'+$(this).attr('id'));
				}
		});
});



//fakelink
$('a[href="#"]').on('click',function(e){e.preventDefault();});



$('body').on('mousedown', '[data-goto_href]', function(e){
	var goto_href =  $(this).data('goto_href');
	if (goto_href != '') {
	 	switch(e.which) {
      case 1: //left Click
        window.location =	goto_href;
        break;
      case 2: //middle Click
        var win = window.open(goto_href, '_blank');
        win.focus();
        break;
	  }
	}
});



//2nd_menu
$(".navbar-nav .menu-item > .dropdown-toggler").on('click',function(e){
	$(this).parent().toggleClass('dropdown-show');
});


//закрытие навбаров при открытии другого навбара
$('.navbar-toggler').on('click',function(){
  $('.navbar-collapse').collapse('hide');
})


// закрытие навбаров на мобиле при клике на пункт меню
$('.navbar .nav-link').on('click', function(e){
	if (isMobile()) {
	 $(this).parents('nav').find('.navbar-collapse').collapse('hide');
	}
});


// to_top_btn
$(window).scroll(function() {
		if($(this).scrollTop() != 0) {
				$('#to_top_btn').addClass('active');
		} else {
				$('#to_top_btn').removeClass('active');
		}
});
$('#to_top_btn').on('click',function(e){
		$("html, body").animate({ scrollTop: 0 }, 300);
});



// Мягкий переход по якорным ссылкам
$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[data-toggle]')
  .click(function(event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            return false;
          } else {
            $target.attr('tabindex','-1');
            $target.focus();
          };
        });
      }
    }
  });


// новый fancybox
if($("[data-fancybox]").length || $(".gallery-icon a").length) {
	$.getScript("//cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js", function() {
		$("[data-fancybox]").fancybox();
		$(".gallery-icon a").fancybox().attr('rel', 'gallery')
	})

	$('body').append("<link rel='stylesheet' id='fancybox3-css'  href='//cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css?ver=3.5.7' type='text/css' media='all'/>");
}



// lazy-load
// (async() => {
//   const images = document.querySelectorAll("img[data-src]");
//   images.forEach(img => {
// 	    img.setAttribute('src', img.getAttribute('data-src'));
//       img.onload = function() {
//         img.removeAttribute('data-src');
//       };
//   });
// })();



// getMenuHeight();  // скролл в мобиле, если нужен
// resizeProportionalBlocks();   // выставляем пропорции в блоках




/* == BOOTAJAX == */

// динамические модалки через bootbox
/* params {
	url: ссылка откуда закачается шаблон
	id:
	class: например, without-padding
	title:
	content:
} */
window.doModal = function(params) {
	if (typeof params.url == 'undefined') { params.url = "#";} // если нет урла - просто заглушка

	if (params.url == '#') {loadedFile = params.content; var $class = '';} // если нет урла - меняем файл на контент
		else {var $class = params.url.match(/[^\/]+$/)[0].replace('.php','').replace('.html','');}

  if (typeof params.id == 'undefined') { params.id = 'dynamicModal' + Math.floor(Math.random() * 9999) + 1}
  	else {
  		params.id = 'modal-' + params.id;
  		params.doNotUnset = true;
		}

	var modal_html =  '<div id="' + params.id + '" class="modal fade loading modal_' + $class + ' ' + params.class + '" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">';
  modal_html += '<div class="modal-dialog" role="document">';
  modal_html += '<div class="modal-content">';

  if (typeof params.title != 'undefined') {
	  modal_html += '<div class="modal-header">';
	  modal_html += '<h5 class="modal-title">'+params.title+'</h5>'
	}
	modal_html += ' <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
	if (typeof params.title != 'undefined') { modal_html += '</div>'; }

  modal_html += '<div class="modal-body"><div class="spinner-border text-secondary" role="status"></div></div>';
  modal_html += '</div>';
  modal_html += '</div>';
  modal_html += '</div>';

  $('body').append(modal_html);
  $('#' + params.id).modal();


	// если есть параметры - сериализуем их
	let paramsObj = {};
	if (typeof params.params != 'undefined') {
		for (let param_key in params.params) {
			paramsObj[param_key] = params.params[param_key];
		}
	}
	let fileParams =  $.param(paramsObj);
	console.log(fileParams)

	// загрузка контента
	$.get(params.url + '?' + fileParams, function(loadedFile) {
  	$('#' + params.id).removeClass('loading');
  	$('#' + params.id + ' .modal-body').html(loadedFile);
  })


  $('#' + params.id).on('hidden.bs.modal', function (e) {
  	if(params.doNotUnset != true) { $(this).remove(); }
  });
}



// динамические алерты через bootbox
/* params {
	id:
	class:
	icon:
	content:
	color: warning
	close: true
	autoclose: 5000
} */
window.doAlert = function(params) {
	if($('body').find('#popupAlerts').length === 0){ // создаём контейнер, если его ранее не было
		$('<div id="popupAlerts"></div>').appendTo('body')
	}

  if (typeof params.id == 'undefined') { params.id = 'dynamicAlert' + Math.floor(Math.random() * 9999) + 1}
  if (typeof params.class == 'undefined') { params.class = ''; }
  if (typeof params.close != 'false') { params.class += " alert-dismissible";	}
  if (typeof params.autoclose == 'undefined') { params.autoclose = 5000; }
  if (typeof params.color == 'undefined') { params.color = 'warning'; }

	var alert_html =  '<div id="' + params.id + '" class="alert alert-'+ params.color +' dynamicAlert fade ' + params.class + '"  role="alert">';

  if (typeof params.close != 'false') {
  	alert_html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
  }

  //alert_html += '<div class="alert-content">'+ params.content +'</div>';
  alert_html += '<div class="alert-content media_obj">';
  alert_html += (params.icon != undefined) ? '<div class="media_obj-icon">'+ params.icon +'</div>' : '';
  alert_html += (params.content) ? '<div class="media_obj-content"><div>'+ params.content +'</div></div>' : '';
  alert_html += '</div>';

  alert_html += '</div>';

  $('#popupAlerts').append(alert_html);
  $('#' + params.id).alert();
  window.setTimeout(function() { $('#'+ params.id).addClass('show'); }, 1); // красивое появление алерта

  // автозакрытие
  if (params.autoclose > 0) {
		window.setTimeout(function() {
			$('#'+ params.id).alert('close');
		}, params.autoclose);
	}

  $('#' + params.id).on('closed.bs.alert', function (e) {
    $(this).remove();
  });
}



// аяксовая отправка форм через on submit
const DATA_FMSHANDLER = 'formmailersubmit';
$('body').on('submit', '*[data-'+DATA_FMSHANDLER+']', function(ev) {
	ev.preventDefault();

	// получаем настройки, если есть
	let fmsSettings;
	if(typeof $(ev.target).data(DATA_FMSHANDLER) != "undefined") {
		fmsSettings = JSON.parse($(ev.target).data(DATA_FMSHANDLER).replace(/\n+\t+\s+/g,'').replace(/'/g,"\""));
	}

	// настройки fms
	let fmsSubmit = {
		fmsSubmit: ev.target.id, // главное обозначение работы fms + имя формы по id
		subject: typeof fmsSettings.subject != 'undefined' ? fmsSettings.subject : ev.target.id,
		// emailTo: fmsSettings.emailTo,
		// handler: fmsSettings.handler,
		responseSuccess: fmsSettings.responseSuccess,
		responseFail: fmsSettings.responseFail,
		fields: []
	};

	// обработка handler
	if(typeof fmsSettings.handler != 'undefined') {
		window[fmsSettings.handler]();
	}

	// собираем данные формы
	$(ev.target).find('*[name]').each(function(){
		let input = {
			label: (typeof $(this).attr('aria-label') != "undefined") ? $(this).attr('aria-label') : $(this).attr('name'),
			val: $(this).val()
		};
		fmsSubmit.fields.push(input);
	})

	// отправляем форму
	$(ev.target).addClass('sending');
	let btnSubmit = {};
	btnSubmit.old = $(ev.target).find('button[type="submit"]').html();
	btnSubmit.new = '<div class="icon"><div class="spinner-grow text-light" role="status"></div></div><div class="content">Sending...</div>';

	$(ev.target).find('button[type="submit"]').html(btnSubmit.new)
	sendMail();

	async function sendMail() {
		let sendData = $(ev.target).serialize();
		console.log(fmsSubmit);
		let formSendPromise = new Promise((resolve, reject) => {
			$.ajax({
				type: "POST",
				url: window.location.href,
				dataType: "json",
				data: fmsSubmit,
				success: function(mailResponse) {
					console.log(mailResponse)
					$(ev.target).trigger("reset");
					$('.modal.show').modal('hide');
					if(mailResponse.mail) { resolve(mailResponse);}
					else { reject(mailResponse);}
				},
				error: function(mailResponse) {
					console.log(mailResponse)
					reject(mailResponse);
				},
			});
		})

		return await formSendPromise.then(
			 result => {
				 // console.log("response:");
				 // console.log(result);
				 doAlert(fmsSubmit.responseSuccess);
			 },
			 error => {
				 // console.log("response:");
				 // console.log(error);
				 doAlert(fmsSubmit.responseFail);
			 }
		).finally(() => {
			$(ev.target).removeClass('sending');
			$(ev.target).find('button[type="submit"]').html(btnSubmit.old)
		});
	}
})



$(document).on('click','.withLoader',function(el) {
	$(this).toggleClass('loading');
})




// data-toggle
$(document).on('click','[data-toggle="toggler"]',function(el){
 el.preventDefault();
 var $target = el.currentTarget.dataset.target;
 var $class;

 if(el.currentTarget.dataset.toggle_class != undefined) { $class = el.currentTarget.dataset.toggle_class;}
 	else {$class = 'active';}

 $($target).toggleClass($class)
 // console.log($target)
 // console.log($class)
});



// отложенная загрузка контента
window.AJAXload = function (el, url) {
	$(el).addClass('AJAXloading');
	$.get(url, function(loadedFile) {
		$(el).html(loadedFile);
		$(el).removeAttr('data-load');
		$(el).removeClass('AJAXloading');
	})
}
$('.load-wrap[data-load]').each(function(){
	if($(this).data('load') != '') { // если есть что грузить - грузим
		if($(this).data('load_delay') > 0) { // если есть отложенная загрузка
			let $this = $(this);
			setTimeout(function() {
				AJAXload($this, $this.data('load'));
			}, $this.data('load_delay'));
		} else { // иначе показываем сразу
				AJAXload($(this), $(this).data('load'));
		}
	} else { // иначе просто убираем спиннер
		$(this).addClass('ready');
	}
});



});
})( jQuery );