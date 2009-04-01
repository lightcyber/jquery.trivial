// Hi! My name iframeupload!
// I'am jQuery plugin, part of jQuery Trivial, allowing easy upload files
// without a page refresh
//
// My bio:
// version: 0.3b (1 April, 2009)
// license: MIT
//
// My creator name is Alexander Koss (kossnocorp@gmail.com)
// Meet at the http://github.com/kossnocorp/jquery.trivial

$(function() {

	// simple function to parse text in json

	function txt_to_json(text) {

		var json = !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
			text.replace(/"(\\.|[^"\\])*"/g, ''))) &&
			eval('(' + text + ')');

		// TODO: Check json object and throw error if it bad

		return(json);
	}

	$.fn.extend({

		//

		iframeupld: function(settings) {
			var sets = jQuery.extend({
				resptype: 'json',	// type of response data
				load: null	// callback function (function(data))
			}, settings);

			var form = $(this);

			// create iframe or if is exist get it

			var iframe = $('#iframeupld');

			if(!iframe.length) {	// frame doesn't exist
				$('body').append('<iframe name="iframeupld" id="iframeupld" style=display:none;"></iframe>');
				iframe = $('#iframeupld');
			}

			// check for form target

			if(form.attr('target') != 'iframeupld') {
				form.attr('target', 'iframeupld');
			}

			// and finally submit form

			form.submit();

			// await load response
			// TODO: Explore parent.functionToCallAfterFileUpload(jsonData);

			iframe.load(function() {
				var response = iframe.contents().find('body').html();

				// if resopnse data == json, eval it

				if(sets.resptype == 'json') response = txt_to_json(response);

				if(sets.load) sets.load(response);

				// kill iframe

				setTimeout(function() {
					iframe.remove()
				}, 0);	// Firefox loading fix
			});
		}
	});
});