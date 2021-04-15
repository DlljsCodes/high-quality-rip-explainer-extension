const f = document.getElementById("form");
const link = 'https://siivagunner.fandom.com/wiki/';

var tabUrl;
var videoTitle;

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;

    console.log("Current Tab URL: " + url);
    tabUrl = url;
    if checkIfYouTubeUrl(tabUrl) {
		// 
	} else {
		// Disable button and show appropriate info
	}
});

function checkIfYouTubeUrl(url) {
	if (url.slice(0, 23) = "https://www.youtube.com") {
		console.log("Is a YouTube URL");
		return true;
	} else {
		console.log("Is NOT a YouTube URL");
		return false;
	}
}

function submitted(event) {
  event.preventDefault();
  const url = link + videoTitle;
  const win = window.open(url, '_blank');
  win.focus();
}

f.addEventListener('submit', submitted);