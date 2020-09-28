(function() {
	
	function check_location(host, pathname) {
		console.assert(window.location.host == host && window.location.pathname == pathname, 'location must be at ' + host + pathname);
	}
	
	function testStep1() {
		check_location("www.google.com", "/");
		console.assert($("#__injected_tip__") &&  $("#__injected_tip__").tagName == "DIV", "failed to find injected tip");
		console.assert($("span[class='steps-count']") && $("span[class='steps-count']").textContent == "Step 1/5 ", "step content info is incorrect");
		console.assert($("div[data-iridize-id='content']") && $("div[data-iridize-id='content']").textContent == "Welcome to Google!\n", "content is incorrect");
	}

	function testStep2() {
		check_location("www.google.com", "/");
		console.assert($("#__injected_tip__") &&  $("#__injected_tip__").tagName == "DIV", "failed to find injected tip");
		console.assert($("span[class='steps-count']") && $("span[class='steps-count']").textContent == "Step 2/5 ", "step content info is incorrect");
		console.assert($("div[data-iridize-id='content']") && $("div[data-iridize-id='content']").textContent == "Click Images to go to images section\n", "content is incorrect");
	}

	function testStep3() {
		check_location("www.google.com", "/imghp");
		console.assert($("#__injected_tip__") &&  $("#__injected_tip__").tagName == "DIV", "failed to find injected tip");
		console.assert($("span[class='steps-count']") && $("span[class='steps-count']").textContent == "Step 3/5 ", "step content info is incorrect");
		console.assert($("div[data-iridize-id='content']") && $("div[data-iridize-id='content']").textContent == "Enter a search query here and click ENTER!\n", "content is incorrect");
	}

	function testStep4() {
		check_location("www.google.com", "/imghp");
		console.assert($("#__injected_tip__") &&  $("#__injected_tip__").tagName == "DIV", "failed to find injected tip");
		console.assert($("span[class='steps-count']") && $("span[class='steps-count']").textContent == "Step 4/5 ", "step content info is incorrect");
		console.assert($("div[data-iridize-id='content']") && $("div[data-iridize-id='content']").textContent == "Click here to search\n", "content is incorrect");
	}

	function testStep5() {
		check_location("www.google.com", "/search");
		console.assert(!$("#__injected_tip__"), "tip should not exist");
	}

	console.clear();

	let tests = [testStep1, testStep2, testStep3, testStep4, testStep5];
	for(let i = 0; i < tests.length; i++) {
		if(localStorage["oracle_guide_step_index"] != i) {
			console.warn(tests[i].name + " can only run in step " + (i + 1)); 
			continue;
		}
		try {
			tests[i]();
			console.log(tests[i].name + " finished");
		} catch(e) {
			console.error(tests[i].name + " failed! Error: " + e.message);
		}		
	}
})();

