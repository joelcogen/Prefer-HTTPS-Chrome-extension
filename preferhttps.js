// Compute HTTPS equivalent URL
// Returns false if HTTPS is unavailable (or already used)
function computeHttpsUrl(old_url) {
	// False if HTTPS already
	if(old_url.match(/\bhttps:\/\//i)) return false;
	
	// Check whitelists
	if(old_url.match( new RegExp(localStorage["hard_whitelist"], "i") )) return false;
	if(old_url.match( new RegExp(localStorage["user_whitelist"], "i") )) return false;
	if(old_url.match( new RegExp(localStorage["auto_whitelist"], "i") )) return false;
	
	// Compute HTTPS URL, false if no changes were made (non-HTTP)
	https_url = old_url.replace(/\bhttp:\/\//i, "https://");
	if(https_url==old_url) return false;
	
	// Check if HTTPS URL is blacklisted
	if(https_url.match( new RegExp(localStorage["auto_blacklist"], "i") )) {
		return https_url;
	}
	
	// Check HTTPS is available
	var xhr = new XMLHttpRequest();
	xhr.open("GET", https_url, false);
	xhr.send();
	if (xhr.status == 200) {
		// Add to blacklist
		localStorage["auto_blacklist"] += "|\\b" + https_url;
	  // Load new URL
		return https_url;
	}
	
	localStorage["auto_whitelist"] += "|\\b" + old_url;
	return false;
}

// Redirect a tab
function loadNewURL(tabId, new_url) {
	chrome.tabs.create( {url: new_url} );
	chrome.tabs.remove(tabId);
}