//Inline function called to use jQuery:
//Done this way to have all implementation in internal scope
(function() {
	
	//Check if website is google.com:
	function validate_website() {
		let current_url = window.location.href;
		if (current_url == 'https://www.google.com/'){
			//TODO: fetch and parse jsonp
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
		alert('Success!');
	}
	
	//main function to run in entry point:
	function main() {
		
		if (validate_website()) {
			showTooltip();
		}
	}
	
    //Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
		//entry point:
		main();
		//end of main
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();