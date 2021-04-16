const f = document.getElementById("form");
const link = 'https://siivagunner.fandom.com/wiki/';

var tabUrl;
var videoTitle;
var error = false;

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;

    console.log("Current Tab URL: " + url);
    tabUrl = url;
	youTubeCheck = checkIfYouTubeUrl(tabUrl);
    if (youTubeCheck) {
		getYouTubeVideoData(tabUrl); // Temporary call
	} else {
		// Disable button and show appropriate info
	}
});

function getYouTubeVideoData(videoUrl) {
	const dataUrlPre = "https://youtube.com/oembed?url=";
	const dataUrlSuf = "&format=json";
	var dataUrl = dataUrlPre + videoUrl + dataUrlSuf;
	console.log("OEmbed URL: " + dataUrl);
	fetch(dataUrl)
		.then(result => result.json())
		.then((out) => {
		console.log("Success! Output: ", out);
		return out;
	}).catch(err => {console.error(err)});
}

function checkIfYouTubeUrl(url) {
	if (url.slice(0, 23) == "https://www.youtube.com") {
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