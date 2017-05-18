'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import history from '../Globals/history' 

import * as s from '../component-styles/component-styles.js';

import * as giphyAPI from '../Globals/GiphyApi.js';

// Necessary evil
//import jQuery from "jquery";
//window.$ = window.jQuery = jQuery;
//window.jQuery = jQuery;
// Necessary evil


export default class Searches extends React.Component {
  constructor(props){
    super(props);
    this.currentUrl = "";
    this.addGifs = this.addGifs.bind(this);
    this.state = {
      gifs: []
    }
  }

  componentWillMount(){
    const { params } = this.props.match;
    const { search } = params;
    const url = giphyAPI.createGiphyURL(search);
    giphyAPI.loadJSON(url, this.addGifs);
  }

  componentDidUpdate(){
    const { params } = this.props.match;
    const { search } = params;
    const url = giphyAPI.createGiphyURL(search);
    if(this.currentUrl != url){
      giphyAPI.loadJSON(url, this.addGifs);
      this.currentUrl = url;
    }
  }

  addGifs(searchResponseData){
    if(Array.isArray(searchResponseData))
      this.setState({
        gifs: searchResponseData
      });
  }

  // When you click a gif it moves you to the gif specific page
  gifClicked(gif){
    const { params } = this.props.match;
    const { search } = params;
    history.push("/searches/" + search + "/" + gif.id, {currentGif: gif});
  }

  render() {
    // Necessary Evil
    // NOTE: Not compatible with current Giphy api.
    /*$(document).ready(function()
    {
        $(".gif").hover(
            function()
            {
              var src = $(this).attr("src");
              $(this).attr("src", src.replace(/\.png$/i, ".gif"));
            },
            function()
            {
              var src = $(this).attr("src");
              $(this).attr("src", src.replace(/\.gif$/i, ".png"));
            });
    });*/
    // Necessary Evil

    // Behaves very simularly to Searches. Maybe theres some why to consolidate their jsx logic.
    return (
        <div>
          <h1></h1>
          <s.GifGallery>
              {this.state.gifs.map(gif => 
                <s.GifFrame key={gif.id}>
                  <s.Gif className="gif" src={gif.images.original.url} alt="loading.." onClick={() => this.gifClicked(gif)}/>
                </s.GifFrame>)}
          </s.GifGallery>
        </div>
    );          // Note: Nested Routes are done differently in RR4. Need to nest them in the actual componenets
  };
};