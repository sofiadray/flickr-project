export function getPhotos(searchText) {
	const url = "https://api.flickr.com/services/rest?method=flickr.photos.search&media=photos&sort=interestingness-desc&text=" + searchText + "&tags=" + searchText + "&format=json&nojsoncallback=1&per_page=4&api_key=" + process.env.FLICKR_API_KEY
	if (searchText.length > 0 && searchText !== undefined) {
		return fetch(url, {
			headers: {
			}
		}).then((response) => {
			if (response.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' + response.status);
				return;
		  	}
		  	return response.json().then((data) => {
		    	var photos = data.photos.photo;
		    	// Build list of individual Flickr urls
				var urls = []
				console.log(urls)
		    	photos.forEach((el)=> {
		    		urls.push("https://farm" + el.farm + ".staticflickr.com/" + el.server + "/" + el.id + "_" + el.secret + ".jpg")
		    	});
		    	return urls
		    });
		  }
		).catch((err) => { console.log('Fetch Error :-S', err);});
	}
}
