const f = document.getElementById("form");
const status = document.getElementById("status");
const link = 'https://siivagunner.fandom.com/wiki/';

var tabUrl;
var videoTitle;
var error = false;

chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
    var tab = tabs[0];
    var url = tab.url;

    console.log("Current Tab URL: " + url);
    tabUrl = url;
    if (checkIfYouTubeUrl(tabUrl)) {
		let isSiIvaGunnerChannel = await checkIfSiIvaGunnerChannel(tabUrl);
		if (isSiIvaGunnerChannel) {
			// All checks complete!
		} else {
			// Disable button and show appropriate info
			setStatus("You aren't watching a high quality rip on the SiIvaGunner channel.", true);
		}
	} else {
		// Disable button and show appropriate info
		setStatus("You aren't watching a YouTube video.", true);
	}
});

async function getYouTubeVideoData(videoUrl) {
	const dataUrlPre = "https://youtube.com/oembed?url=";
	const dataUrlSuf = "&format=json";
	var dataUrl = dataUrlPre + videoUrl + dataUrlSuf;
	try {
		let res = await fetch(dataUrl);
		return await res.json();
		console.log("Success! Output: ", res,json());
	} catch(error) {
		console.error(error);
	}
}

function setStatus(message, redText) {
	status.innerHTML = message;
	if (redText) {
		status.style.color = "DarkRed";
	} else {
		status.style.color = "initial";
	}
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

async function checkIfSiIvaGunnerChannel(videoUrl) {
	var videoData = await getYouTubeVideoData(videoUrl);
	var channelName = videoData.author_name;
	console.log("Channel Name: " + channelName);
	if (channelName == "SiIvaGunner") {
		console.log("Is a video by SiIvaGunner");
		return true;
	} else {
		console.log("Is NOT a video by SiIvaGunner");
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