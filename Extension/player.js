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
			if(!("oracle_guide_step_index" in localStorage)) {
				localStorage["oracle_guide_step_index"] = 0;
			}
			this.max_step_reached = -1;  
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
		
		get current_step_index() {
			return parseInt(localStorage["oracle_guide_step_index"]);
		}
		
		set current_step_index(new_current_step_index) {
			localStorage["oracle_guide_step_index"] = new_current_step_index
		}
		
		get step_url() {
			return localStorage["oracle_guide_url_" + this.current_step_index]
		}
		
		set step_url(new_url) {
			localStorage["oracle_guide_url_" + this.current_step_index] = new_url;
		}
		
		/* injects css to the page */
		inject_style() {
			let style_element = document.createElement('style');
			style_element.innerHTML = this.style;
			$("head").append(style_element);
		}
				
		update_guide() {
			//remove old tip and place new one:
			let injected_tip = $("#__injected_tip__");
			injected_tip.remove();
			
			this.inject_tip();
			this.setup_click_handlers();
			this.set_tip_information();
			
			if(this.current_step_index > this.max_step_reached) {
				this.max_step_reached = this.current_step_index;
			}
		}
						
		next_without_guide_update(event) {
			this.step_url = window.location.href

			//increment step index:
			if(this.current_step_index < this.steps.length - 1) {
				this.current_step_index = this.current_step_index + 1;
			}			
		}
		
		/* handle next guide operation */
		next(event) {		
			this.next_without_guide_update(event);
			this.update_guide();
		}
		
		/* handle back guide operation */
		back() {
			//decrement step index:
			if(this.current_step_index > 0) {
				this.current_step_index = this.current_step_index - 1;;
			}
			
			// Check if we need to redirect the page
			if(this.step_url && this.step_url != window.location.href) {
				window.location.href = this.step_url;
			}
			else {
				//remove old tip and place new one:
				let injected_tip = $("#__injected_tip__");
				injected_tip.remove();
				
				this.inject_tip();
				this.setup_click_handlers();
				this.set_tip_information();		
			}
		}
		
		/* handle remind later button click. TODO: Complete */
		remindLater() {
			let injected_tip = $("#__injected_tip__");
			injected_tip.remove();
			let current_step = this.steps[this.current_step_index];
			setTimeout(this.restore_tip.bind(this), current_step.action.warningTimeout);
		}
		
		/* handle close button click. TODO: Complete */
		close() {
			//remove the tip:
			let injected_tip = $("#__injected_tip__");
			injected_tip.remove();
		}
		
		input_event_handler(event) {
			if (event.key === 'Enter' || event.keyCode === 13) {
				this.next(event);
			}
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
		
		/* Fixes "a" element href's domain */ 
		fix_a_href(selector) {
			let target_element = $(selector).get(0);
			if(target_element.tagName == "A") {
				if(target_element.href != "") {
					// Make sure the link of the a element will be in the same domain		
					let target_url = target_element.href;
					let url_object = new URL(target_url);
					url_object.host = window.location.host;
					target_element.href = url_object.toString();
				}
			}
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
								   
			// The selector in step with id 5 doesn't exist in the page(?). Used another one as a workaround.
			if (current_step.action.selector == "input[value=\"Google Search\"]") {
				current_step.action.selector = "button[aria-label=\"Google Search\"]";
			}
		   
								   
			$(current_step.action.selector).after(wrapped_tip_html);
						
			//set next (if exists):
			if('next' in current_step) {
				let next_selector = current_step.next.selector;
				let next_event = current_step.next.event;	
				if(next_event == "click" && this.current_step_index > this.max_step_reached) {
					this.fix_a_href(next_selector);
					//bind next click event to the selector:
					$(next_selector).click(this.next_without_guide_update.bind(this));
				}
			}
			
			// if selector is of type "input", handle it:
			// NOTE: The json file doesn't have other inticators, so we assume in such a case that when we have "input" tag
			// we will listen to submit event 
			let selector_element = $(current_step.action.selector).get(0);
			if(selector_element) {
				if(selector_element.tagName == "INPUT") {
					$(current_step.action.selector).on("keyup", this.input_event_handler.bind(this));
				}
				//TODO - This is for step 4. Currently the event handler doesn't fire
				else if(selector_element.tagName == "BUTTON" && selector_element.form) {
					 $(current_step.action.selector).click(this.next_without_guide_update.bind(this));
				}
			}
		}

		set_tip_information() {
			let step_info = $("span[class='steps-count']");
			let current_step_number = step_info.children()[0];
			let total_steps = step_info.children()[1];
			
			current_step_number.textContent = (this.current_step_index + 1);
			total_steps.textContent = this.steps.length + " ";
			
			//set content:
			let current_step = this.steps[this.current_step_index];
			let content = current_step.action.contents["#content"];
			$("div[data-iridize-id='content']").append(content);
			
			// Change role content
			for(let button_type in current_step.action.roleTexts) {
				$("a[data-iridize-role='" + button_type + "']").text(current_step.action.roleTexts[button_type]);
			}

		}
		
		need_to_show_tip() {
			let current_step = this.steps[this.current_step_index];
			return current_step.action.type == "tip";
		}
		
		restore_tip() {
			if(this.need_to_show_tip()) {
				this.inject_tip();
				this.setup_click_handlers();
				this.set_tip_information();
			}
		}
		
		/* Run the guide */
		run() {
			if(this.need_to_show_tip()) {
				this.inject_style();
				this.inject_tip();
				this.setup_click_handlers();
				this.set_tip_information();
				this.max_step_reached = this.current_step_index;
			}			
		}
	}

	function main() {
		let current_url = window.location.href;
		let google_com_url = 'https://www.google.com/';
		if (current_url.substring(0, google_com_url.length) != google_com_url){
			throw "Can only be run on https://www.google.com/...";
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