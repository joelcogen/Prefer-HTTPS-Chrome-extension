// Parse links
function updateLink(link) {
	if(link.https_url != false) {
		document.getElementsByTagName("a")[link.i].href = link.https_url;
	}
}

var links = document.getElementsByTagName("a");
for(var i=0; i<links.length; i++) {
	// Send request to background, because we cannot made cross-domain XHR
	chrome.extension.sendRequest({"action": "computeHttpsUrl", "old_url": links[i].href, "i": i}, updateLink);
}