//Inline function called to use jQuery:
//Done this way to have all implementation in internal scope
(function() {
	
	class GuideManager {
		
		constructor(guide_data) {
			this.guide_data = guide_data;
			if (!('data' in this.guide_data)) {
				throw "data property is missing in guide_data"
			}
			this.data = this.guide_data.data
			if (!('tiplates' in this.data)) {
				throw "tiplates property is missing in data"
			}
			this.tiplates = this.data.tiplates
			if (!('css' in this.data)) {
				throw "css property is missing in data"
			}
			this.style = this.data.css
			if (!('structure' in this.data)) {
				throw "structure property is missing in data"
			}
			this.structure = this.data.structure
			if (!('steps' in this.structure)) {
				throw "steps property is missing in structure"
			}
			this.steps = this.structure.steps;
			this.current_step = 0;
		}
			
		static get oracle_guide_url() {
			return 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&amp;refresh=true&amp;env=dev&amp;type=startPanel&amp;vars%5Btype%5D=startPanel&amp;sid=none&amp;_=1582203987867';
		}
		
		static wrap_with_div(html_data, div_class) {
			return "<div class='" + div_class + "'>" + html_data + "</div>";
		}
		
		/* injects css to the page */
		inject_style() {
			let style_element = document.createElement('style');
			style_element.innerHTML = this.style;
			$("head").append(style_element);
		}
		
		/* injects and wraps tip html with necessary div element into the page */
		/* TODO: Check if hoverTip needs to be added */
		/* TODO: Check what additional modifications are needed for the style */
		
		inject_tip() {
			let current_step = this.steps[this.current_step];
			let current_placement = current_step.action.placement;
			let tip_html = this.tiplates.tip;
		
			// Wrap tip_html with the corresponding div classes for making the style to work
			let tip_class = ["tooltip", "in", current_placement, current_step.action.classes].join(" ");
			
			let wrapped_tip_html = GuideManager.wrap_with_div(
								    GuideManager.wrap_with_div(
									 GuideManager.wrap_with_div(tip_html, tip_class)
									,"panel-container")
								   ,"sttip");		
			$(current_step.action.selector).parent().append(wrapped_tip_html);
		}
				
		/* handle next button click. TODO: Complete */
		next() {
			alert("next clicked");
		}
		
		/* handle back button click. TODO: Complete */
		back() {
			alert("back clicked");
		}
		
		/* handle remind later button click. TODO: Complete */
		remindLater() {
			alert("remindLater clicked");
		}
		
		/* handle close button click. TODO: Complete */
		close() {
			alert("close clicked");
		}

		
		setup_click_handlers(){
			let close_btn = $("button[aria-label='Close']");	
			let remind_later_btn = $("button[data-iridize-role='laterBt']");
			let back_btn = $("button[data-iridize-role='prevBt']");
			let next_link = $("a[data-iridize-role='nextBt']");
			
			//set on click functions:
			//binding handlers to have access to this (GuideManager) object
			close_btn.click(this.close.bind(this));
			remind_later_btn.click(this.remindLater.bind(this));					
			back_btn.click(this.back.bind(this));					
			next_link.click(this.next.bind(this));
		}
		
		/* TODO: complete */
		set_tip_information() {
		}
		
		/* Run the guide */
		run() {
			this.inject_style();
			this.inject_tip();
			this.setup_click_handlers();
			this.set_tip_information();
		}
	}

	function main() {
		let current_url = window.location.href;
		
		if (current_url != 'https://www.google.com/'){
			throw 'Can only be run on https://www.google.com/'
		}
		
		//get as text from url:
		$.get(GuideManager.oracle_guide_url, function(data){
			console.log('loading text succeeded');
			
			function wrap_with_div(html_data, div_class) {
				return "<div class='" + div_class + "'>" + html_data + "</div>";
			}

			//get substring resides in __5szm2kaj( ... ): 
			let first_index = "__5szm2kaj(".length;
			let last_index = data.length - 1;
			let jsonp_str = data.substring(first_index, last_index);

            let jsonp_data = JSON.parse(jsonp_str);
			
			let guide_manager = new GuideManager(jsonp_data);
			
			$(document).ready(guide_manager.run.bind(guide_manager));
			
		}, "text")
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.log("error " + textStatus);
			console.log("incoming Text " + jqXHR.responseText);
			console.log(errorThrown);
		});
		
	}
	
	main();

})();