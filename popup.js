const f = document.getElementById("form");
const link = 'https://siivagunner.fandom.com/wiki/';

var tabTitle;
var videoTitle;

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    var title = tab.title;

    console.log("Title: " + title);
    tabTitle = title;
    isolateVideoTitle(tabTitle);
});

function isolateVideoTitle(tab) {
	videoTitle = tab.slice(0, -10);
	console.log(videoTitle);
}

function submitted(event) {
  event.preventDefault();
  const url = link + videoTitle;
  const win = window.open(url, '_blank');
  win.focus();
}

f.addEventListener('submit', submitted);