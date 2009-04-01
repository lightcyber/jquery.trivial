// Hi! My name onchanged!
// I'am jQuery plugin, part of jQuery Trivial, allowing to catch paste by mouse
// to validate, checkout etc
//
// My bio:
// version: 0.1a (1 April, 2009)
// license: MIT
//
// My creator name is Alexander Koss (kossnocorp@gmail.com)
// Meet at the http://github.com/kossnocorp/jquery.trivial

$(function() {
	$.fn.extend({

		onchanged: function() {

			if($.browser.msie) {

				$(this).each(

					function() {
						$(this).bind('keyup', function(){ $(this).trigger('onchanged'); });
						var triger_me = this;
						this.onpaste = function(){ setTimeout( function(){ $(triger_me).trigger('onchanged'); }, 0); };

//						$(this).bind('focus', function(){ $(this).trigger('onchanged'); });
//						$(this).bind('blur', function(){ $(this).trigger('onchanged'); });
					}
				);

			} else {

				$(this).each(

					function() {
						$(this).bind('keyup', function(){ $(this).trigger('onchanged'); });
						this.addEventListener('input', function(){ $(this).trigger('onchanged'); }, false);

//						$(this).bind('focus', function(){ $(this).trigger('onchanged'); });
//						$(this).bind('blur', function(){ $(this).trigger('onchanged'); });
					}
				);
			}
		}
	});
});