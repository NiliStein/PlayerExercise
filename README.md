# PlayerExercise
Player exercise given by Oracle

CONTENT:
The package includes:
- README file
- Extension directory, containing:
	- manifest.json
	- player.js

INSTRUCTIONS:
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
	2.5. In your system's files explorer, Go to the package's directory > Extension and open player.js.
			Copy its content to your newley created snippet and save it.
	2.6. Go to google.com.
	2.7 Run the snippet by right-clicking on it > Run OR by clicking the triangle button.
	* Note: The snippet will run as long as you stay on the same webpage.
	* Upon refresh OR redirection to another page, simply run the snippet again.
	* To start over the guide from the first step:
	* either restart your browser OR open the console and type:
	*	delete localStorage["oracle_guide_step_index"]
	* and then refresh the page.
	