
const giphySearchEndpoint = "http://api.giphy.com/v1/gifs/search";
const giphyPublicKey = "&api_key=dc6zaTOxFJmzC";
const query = "?q=";

const searchQuery = giphySearchEndpoint + query;

export function createGiphyURL(search){
    return searchQuery + search + giphyPublicKey;
}

export function loadJSON(url, callback){
    var data = [];
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        callback(response.data);
        }
       }
    xhr.open('GET', url, true); 
    xhr.send();
}