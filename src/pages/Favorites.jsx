'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import history from '../Globals/history' 

import * as s from '../component-styles/component-styles.js';

//import FavoritesKey from '../Globals/favoritesKey.js';

export default class Favorites extends React.Component {
  getFavorites(){
    if (typeof(Storage) !== "undefined") {
      var favorites = JSON.parse(localStorage.getItem("FavoritesKey"));
      return Object.values(favorites);
    }
  }

  gifClicked(gif){
    const { params } = this.props.match;
    const { search } = params;
    history.push("/favorites/" + gif.id, {currentGif: gif});
  }

  // Behaves very simularly to Searches. Maybe theres some why to consolidate their jsx logic.
  render() {
    return (
      <div>
        {/* <h1>Welcome To The Favorites Page</h1> */}
        <h1></h1>
        <s.GifGallery>
          {this.getFavorites().map(gif => 
                <s.GifFrame key={gif.id}>
                  <s.Gif className="gif" src={gif.images.original.url} alt="loading.." onClick={() => this.gifClicked(gif)}/>
                </s.GifFrame>)}
        </s.GifGallery>
      </div>
    );
  };
};