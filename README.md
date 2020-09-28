# PlayerExercise
Player exercise given by Oracle

Table of contents:
A. CONTENT
B. INSTRUCTIONS
C. TESTS
D. OPEN ISSUES

**********

A. CONTENT:
The package includes:
- README file
- Extension directory, containing:
	- manifest.json
	- jquery.min.js
	- player.js

***

B. INSTRUCTIONS:
The script can either be run with Google Chrome DevTools or by using the extension.

1. Using the extension:
	1.0. Download the package to your path of choice.
	1.1. Open Google Chrome and go to chrome://extensions/
	1.2. Click on "Load Unpacked"
	1.3. Go to the path of the package and choose the Extension directory, then click "Select Folder".
	1.4. If the extension is turned off by default, turn it on by clicking the toggle button.
	1.5. Go to google.com to start the guide.
	* Note: The extension keeps the guide's state, so if you wish to start over from the first step at google.com
	* either restart your browser OR open the console (ctrl + shift + j) and type:
	*	delete localStorage["oracle_guide_step_index"]
	* and then refresh the page
	
2. Using DevTools:
	2.0. Download the package to your path of choice.
	2.1. Open Google Chrome and open the console (ctrl + shift + j).
	2.2. Click on "Sources" tab
	2.3. In the menu below, click on "Snippets" (might be hidden inside the menu opened by clicking ">>")
	2.4. Click on "New snippet" and name it as you wish
	2.5. In your system's files explorer, Go to the package's directory > Extension and open jquery.min.js and player.js.
			Copy jquery.min.js content first and then player.js content to your newly created snippet and save it.
	2.6. Go to google.com.
	2.7 Run the snippet with Ctrl + Enter OR by right-clicking on it > Run OR by clicking the triangle button.
	* Note: The snippet will run as long as you stay on the same webpage.
	* Upon refresh OR redirection to another page, simply run the snippet again.
	* To start over the guide from the first step:
	* either restart your browser OR open the console and type:
	*	delete localStorage["oracle_guide_step_index"]
	* and then refresh the page.

***

C. TESTS

To run the tests:
	1. Run the guide as instructed.
	2. Copy the content of tests.js to a new snippet.
	3. Run the snippent after every step load.
	
NOTE:
	The tests are basic and assume that localStorage data is correct.
	The tests do not trigger user actions.

***

D. OPEN ISSUES:
1.	The script runs on google.com only, but in other local regions (Israel, in our case), Images link redirects to google.co.il.
	To overcome this, instead of allowing the script to run on any domain of google, I've programatically changed the host of the
	"Images" 'a' href to google.com.
2.	No mechanism is implemented to identify when guide's data in the localStorage should be deleted.
	That is, if previous guide session stopped at, for example, step 2, upon loading google.com it'll load immediately step 2.
3.	Step with id 5 has a selector that doesn't exist on the page.
	The workaround is to replace the selector with an existing one that seemed to be the intended one.
4.	Following the same issue, I was not sure about the behavior expected from the guide in the last two steps, so I assumed that
	the redirection to the search results page should happen upon clicking the search button. Nevetheless, I couldn't manage to
	fire the event handler by clicking it without postponing the due date. This results in a repeating appearance of step 4 after
	the search is done, and only after that clicking "Done" closes the guide.
5.	I wasn't sure about the "Remind me later" functionality. I assumed it had to do something with the warning timeout.
