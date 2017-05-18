'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import history from '../Globals/history' 

import * as s from '../component-styles/component-styles.js';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.setSearchValue = this.setSearchValue.bind(this);
    this.searchGiph = this.searchGiph.bind(this);
  }

  setSearchValue(e) {
    this.props.setSearchValue(e.target.value);
    // We return false as to prevent the "onSubmit" function of the form html element from
    // reloading the page.
    return false;
  };

  searchGiph(e) {
    this.props.searchGiph(e.target.value);
    return false;
  };

  render() {
    return (
      <form className="navbar-form navbar-left" role="search" onSubmit={ this.searchGiph }>
          <label for="search">Search:</label>
          <input type="text" onChange={ this.setSearchValue }/>
      </form>
    );
  };
};

class SearchButton extends React.Component {
  render() {
    return (
      <s.Button style={this.style} onClick={ this.props.searchGiph }>
        Search Giphs!!!
      </s.Button>
    );
  };
};

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.searchGiph = this.searchGiph.bind(this);
    this.setSearchValue = this.setSearchValue.bind(this);
    this.state = {searchValue: "", currentSearchValue: ""};
  }

  searchGiph() {
    let newCurrentSearchValue = this.state.searchValue;
    this.setState({
      currentSearchValue: newCurrentSearchValue
    });
    if(newCurrentSearchValue){
      history.push("/searches/" + newCurrentSearchValue);
    } else{
      history.push("/");
    }
  };
  
  setSearchValue(newSearchValue) {
    this.setState({
      searchValue: newSearchValue
    });
  };

  render() {
    return (
      <div>
        <h1>GiphFind</h1>
        <div id="AppHeader">
            <Link to="/favorites"><s.Button>favorites</s.Button></Link>
            <div id="SearchHeader">
              <SearchBar id="SearchBar" searchGiph={ this.searchGiph } setSearchValue={ this.setSearchValue}/>
              <SearchButton id="SearchButton" searchGiph={ this.searchGiph }/>
            </div>
        </div>
        {this.props.children}
      </div>
    );
  };
};