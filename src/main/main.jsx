'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ReactRouter from 'react-router';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../Globals/history' 

import Layout from '../pages/Layout.jsx';
import Home from '../pages/Home.jsx';
import Favorites from '../pages/Favorites.jsx';
import Searches from '../pages/Searches.jsx';
import GifFocus from '../pages/GifFocus.jsx';
//import FavoritesKey from '../Globals/favoritesKey.js';

// Later on we may want to seperate out these two logical things in seperate files.

// Set Our Local Browser Storage (in future may swap out with indexDB)
if (typeof(Storage) !== "undefined") {
  var favorites = localStorage.getItem("FavoritesKey");
  // if favorites does not exist.. add it
  if(!favorites) 
    localStorage.setItem("FavoritesKey", JSON.stringify({}));
}

// Set Our Routes 
ReactDOM.render(
  <Router history={history}>
    <Layout>
      <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/favorites/:gifId" component={GifFocus}/>
          <Route path="/favorites" component={Favorites}/>
          <Route path="/searches/:search/:gifId" component={GifFocus}/>
          <Route path="/searches/:search" component={Searches}>
          </Route>
      </Switch>
    </Layout>
  </Router>,
document.getElementById("main"));