//Inline function called to use jQuery:
//Done this way to have all implementation in internal scope
(function() {
	
	//Check if website is google.com:
	function validate_website() {
		let current_url = window.location.href;
		if (current_url == 'https://www.google.com/'){
			console.log('Webpage is: https://www.google.com/');
			return true;
		}
		console.error('Can only be run on https://www.google.com/');
		return false;
	}
	
	function showTooltip() {
		//Oracle's jsonp guide url:
		const jsonp_url = 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&amp;refresh=true&amp;env=dev&amp;type=startPanel&amp;vars%5Btype%5D=startPanel&amp;sid=none&amp;_=1582203987867';
		//TODO: Fetch and parse jsonp, use window.jQuery for that

		//get as text from url:
		window.jQuery.get(jsonp_url, function(data){
			console.log('loading text succeeded');

			//get substring resides in __5szm2kaj( ... ): 
			let first_index = "__5szm2kaj(".length;
			let last_index = data.length - 1;
			let jsonp_str = data.substring(first_index, last_index);

            let jsonp_data = JSON.parse(jsonp_str);
			
			//Inject html and css:
			let tip_html = jsonp_data.data.tiplates.tip;
			let hover_tip_html = jsonp_data.data.tiplates.hoverTip;
			let css_str = jsonp_data.data.css;
			
			$("body").append(tip_html);
			
			//get elements of the tip:
			let close_btn = $("button[aria-label='Close']");	
			let remind_later_btn = $("button[data-iridize-role='laterBt']");
			let back_btn = $("button[data-iridize-role='prevBt']");
			let next_link = $("a[data-iridize-role='nextBt']");
			let step_info = $("span[class='steps-count']");
			let current_step = step_info.children[0];
			let total_steps = step_info.children[1];
			
			
			let style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = css_str;
			$("head").append(style);			

		}, "text")
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.log("error " + textStatus);
			console.log("incoming Text " + jqXHR.responseText);
			console.log(errorThrown);
		});
		
	}
	
	//main function to run in entry point:
	function main() {
		
		if (validate_website()) {
			showTooltip();
		}
	}
	
	main();
    //Load the script
//    var script = document.createElement("SCRIPT");
//    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
//   script.type = 'text/javascript';
//    script.onload = function() {
		//entry point:
//		main();
		//end of main
//    };
//    document.getElementsByTagName("head")[0].appendChild(script);
})();