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
		$.get(jsonp_url, function(data){
			console.log('loading text succeeded');
			
			//define click handlers:
			function onCloseBtnClick() {
				alert("close button clicked");
			}
			
			function onRemindLaterBtnClick() {
				alert("remind later button clicked");
			}
			
			function onBackBtnClick() {
				alert("back button clicked");
			}
			
			function onNextLinkClick() {
				alert("next clicked");
			}

			function wrap_with_div(html_data, div_class) {
				return "<div class='" + div_class + "'>" + html_data + "</div>";
			}

			//get substring resides in __5szm2kaj( ... ): 
			let first_index = "__5szm2kaj(".length;
			let last_index = data.length - 1;
			let jsonp_str = data.substring(first_index, last_index);

            let jsonp_data = JSON.parse(jsonp_str);
			
			$(document).ready(function() {
			
				let css_str = jsonp_data.data.css;
				let style = document.createElement('style');
				style.innerHTML = css_str;
				$("body").append(style);
				
				// Check if type is tip or CloseScenario
				
				// Get current_step
				
				let current_step = jsonp_data.data.structure.steps[0];
				let current_placement = current_step.action.placement;
				
				//Inject html and css:
				let tip_html = jsonp_data.data.tiplates.tip;
				let hover_tip_html = jsonp_data.data.tiplates.hoverTip;
			
				// Wrap tip_html with the corresponding div class
				
				let tip_class = ["tooltip", "in", current_placement, current_step.action.classes].join(" ");
				
				let wrapped_tip_html = wrap_with_div(
											wrap_with_div(
												wrap_with_div(tip_html, tip_class)
													, "panel-container")
											, "sttip");
				// let wrapped_hover_tip_html = wrap_with_div(wrap_with_div(hover_tip_html, "tooltip"), "sttip");
			
				$(current_step.action.selector).parent().append(wrapped_tip_html);
				
				//get elements of the tip:
				let tip_div = $("div[aria-label='Steps']");
				
				// Assumes there's only one object for each of the following attributes values 
				let close_btn = $("button[aria-label='Close']");	
				let remind_later_btn = $("button[data-iridize-role='laterBt']");
				let back_btn = $("button[data-iridize-role='prevBt']");
				let next_link = $("a[data-iridize-role='nextBt']");
				
				let step_info = $("span[class='steps-count']");
				let current_step_number = step_info.children[0];
				let total_steps = step_info.children[1];
				
				//set on click functions:	
				close_btn.click(onCloseBtnClick);
				remind_later_btn.click(onRemindLaterBtnClick);					
				back_btn.click(onBackBtnClick);					
				next_link.click(onNextLinkClick);	
				
			});				

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

})();