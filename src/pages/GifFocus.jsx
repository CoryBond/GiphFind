'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import * as s from '../component-styles/component-styles.js';

import history from '../js/history' 

//import FavoritesKey from '../Globals/favoritesKey.js';

import * as giphyAPI from '../js/GiphyApi.js';

class FavoriteThisGifButton extends React.Component {

  constructor(props) {
    super(props);
    this.addOrDeleteGifAtFavorites = this.addOrDeleteGifAtFavorites.bind(this);
    this.state = {favorited: false};
  }

  componentDidMount(){
    if (typeof(Storage) !== "undefined") {
      // If the gif exists in our favorites storage then change the button color.
      var favorites = JSON.parse(localStorage.getItem("FavoritesKey"));
      var currentGif = this.props.currentGif;
      var cID = currentGif.id;
      if(favorites[cID]){
         this.setState({
           favorited: true
         });
      }
    }
  }

  addOrDeleteGifAtFavorites(){
    var currentGif = this.props.currentGif;
    var cID = currentGif.id;
    if (typeof(Storage) !== "undefined") {
      var favorites = JSON.parse(localStorage.getItem("FavoritesKey"));
      if(!favorites[cID]){
        favorites[cID] = currentGif;
        this.setState({
           favorited: true
        });
      } else{
        delete favorites[cID];
        this.setState({
           favorited: false
        });
      }
      // If either we add or set we have to still change the underlying favorites.
      localStorage.setItem("FavoritesKey", JSON.stringify(favorites));
    }
  }

  render() {
    return (
      <s.FavoriteTheGifButton favorited={this.state.favorited} onClick={ this.addOrDeleteGifAtFavorites }> 
        Favorite This!
      </s.FavoriteTheGifButton>
    );
  };
};

class ShuffleButton extends React.Component {

  constructor(props) {
    super(props);
    this.shuffle = this.shuffle.bind(this);
  }

  shuffle(){
    var searchTerm = this.props.searchTerm;
    const url = giphyAPI.createGiphyURL(searchTerm);
    giphyAPI.loadJSON(url, this.props.addGifs);
  }

  render() {
    return (
      <s.ShuffleButton onClick={ this.shuffle }> 
        Shuffle
      </s.ShuffleButton>
    );
  };
};

export default class GifFocus extends React.Component {
   constructor(props) {
    super(props);
    this.addGifs = this.addGifs.bind(this);
    this.search = this.props.match.params.search;
    this.state = {currentGif: this.props.location.state.currentGif};
  }

  componentWillReceiveProps(nextProps){
      this.setState({
        currentGif: nextProps.location.state.currentGif
      });
  }

  getDaysAgo(gifDate){
    return gifDate;
  }

  addGifs(searchResponseData){

    if(Array.isArray(searchResponseData)){
      var randomIndex = this.getRandomArbitrary(0, searchResponseData.length);
      var shuffledGif = searchResponseData[randomIndex];
      history.push("/GiphFind/searches/" + this.search + "/" + shuffledGif.id, {currentGif: shuffledGif});
    }
  }

  getRandomArbitrary(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
  }

  OptionalShuffleButton(){
    if(!this.search) return;
    return (
      <ShuffleButton searchTerm={this.search} addGifs={this.addGifs}> 
        Shuffle
      </ShuffleButton>
    )
  }

  render() {
    return (
        <div>
          <h1></h1>
          <s.GifPortrait>
            <s.GifFrame>
              <s.Gif src={this.state.currentGif.images.original.url} alt="loading.."/>
              <div>
                <s.MetaData>
                  <div> 
                    Source: <a href={this.state.currentGif.source}>
                              {this.state.currentGif.source}
                            </a>
                  </div>
                  <div> 
                    Rating: {this.state.currentGif.rating}
                  </div>
                  <div> 
                    Uploaded: {this.getDaysAgo(this.state.currentGif.import_datetime)}
                  </div>
                </s.MetaData>
                <FavoriteThisGifButton currentGif={this.state.currentGif}/>
              </div>
              {this.search &&
                <ShuffleButton searchTerm={this.search} addGifs={this.addGifs}> 
                  Shuffle
                </ShuffleButton>
              }
            </s.GifFrame>
          </s.GifPortrait>
        </div>
    );
  };
  
};