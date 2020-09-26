//Inline function called to use jQuery:
//Done this way to have all implementation in internal scope
(function() {
	
	// class ActionData {
		
		// /* tip, hoverTip, closeScenario */
		// constructor(type) {
			// this.type = type;
		// }
		// constructor(content) {
			// this.contents = content;
		// }
		// constructor(role) {
			// this.roleTexts = role;
		// }
		// constructor(placement) {
			// this.placement = placement;
		// }
		// constructor(classes) {
			// this.classes = classes;
		// }
		// constructor(selector) {
			// this.selector = selector;
		// }
		// constructor(value) {
			// this.stepOrdinal = value;
		// }
		// constructor(value) {
			// this.onlyOneTip = value;
		// }
		// constructor(value) {
			// this.watchSelector = value;
		// }
		// constructor(timeout) {
			// this.warningTimeout = timeout;
		// }
		// constructor(time) {
			// this.exposeType = time;
		// }
		// constructor(value) {
			// this.fixed = value;
		// }
		// constructor(value) {
			// this.watchDog = value;
		// }
		// constructor(value) {
			// this.wdInterval = value;
		// }
	// }	
	
	// class Followers {
		// /* boolean: */
		// constructor(value) {
			// this.condition = value;
		// }
		// /* number: */
		// constructor(value) {
			// this.next = value;
	// } 
	
	// class StepInfo {
		
		// constructor(value) {
			// this.route = value;
		// }
		// constructor(value) {
			// this.id = value;
		// }
		// constructor(value) {
			// this.uid = value;
		// }
		// constructor(action_data) {
			// this.action = action_data;
		// }
		// constructor(followers) {
			// this.followers = followers;
		// }
	// }
	
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
			this.current_step_index = 0;
		}
			
		static get oracle_guide_url() {
			return 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&amp;refresh=true&amp;env=dev&amp;type=startPanel&amp;vars%5Btype%5D=startPanel&amp;sid=none&amp;_=1582203987867';
		}
		
		static wrap_with_div(html_data, div_class, id) {
			let div_start = "<div ";
			let div_end = "class='" + div_class + "'>" + html_data + "</div>";
			if(id) {
				div_start = div_start + "id='" + id + "' ";
			}
			return div_start + div_end;			
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
			let current_step = this.steps[this.current_step_index];
			let current_placement = current_step.action.placement;
			let tip_html = this.tiplates.tip;
		
			// Wrap tip_html with the corresponding div classes for making the style to work
			let tip_class = ["tooltip", "in", current_placement, current_step.action.classes].join(" ");
			
			let wrapped_tip_html = GuideManager.wrap_with_div(
								    GuideManager.wrap_with_div(
									 GuideManager.wrap_with_div(tip_html, tip_class, "__tip_class__") //undescore chars for distinct id
									,"panel-container", "__panel_container__")
								   ,"sttip", "__injected_tip__");	//outer div had id = '__injected_tip__'
			$(current_step.action.selector).parent().append(wrapped_tip_html);
		}
		
		update_tip() {
			let current_step = this.steps[this.current_step_index];
			let current_placement = current_step.action.placement;
			let tip_class = ["tooltip", "in", current_placement, current_step.action.classes].join(" ");
			
			$("#__tip_class__").attr('class', tip_class);
		}
		
		/* handle next button click. TODO: Complete */
		next() {
			//increment step index:
			if(this.current_step_index < this.steps.length - 1) {
				this.current_step_index++;
			}
			
			//remove old tip and place new one:
			let injected_tip = $("#__injected_tip__");
			injected_tip.remove();
			
			this.inject_tip();
			this.setup_click_handlers();
			this.set_tip_information();
			
		}
		
		/* handle back button click. TODO: Complete */
		back() {
			//decrement step index:
			if(this.current_step_index > 0) {
				this.current_step_index--;
			}
			
			//remove old tip and place new one:
			let injected_tip = $("#__injected_tip__");
			injected_tip.remove();
			
			this.inject_tip();
			this.setup_click_handlers();
			this.set_tip_information();		
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
			let step_info = $("span[class='steps-count']");
			let current_step_number = step_info.children()[0];
			let total_steps = step_info.children()[1];
			
			current_step_number.textContent = this.steps[this.current_step_index].action.stepOrdinal + "";
			total_steps.textContent = this.steps.length + " ";
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