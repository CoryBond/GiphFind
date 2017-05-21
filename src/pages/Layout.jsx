'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import history from '../js/history' 

import * as s from '../component-styles/component-styles.js';
import * as b from 'react-bootstrap'

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
      <b.Navbar.Form className="navbar-form navbar-left form-group" role="search" onSubmit={ this.searchGiph }>
          <label for="search">Search:</label>
          <input type="text" onChange={ this.setSearchValue }/>
      </b.Navbar.Form>
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
        <b.Jumbotron>
          <img src="../Resources/GiphFind.png" className="img-responsive center-block"/>
        </b.Jumbotron>
        <b.Navbar id="AppHeader" className="center-block">
            <div id="SearchHeader" className="center-block">
              <SearchBar id="SearchBar" searchGiph={ this.searchGiph } setSearchValue={ this.setSearchValue}/>
              <SearchButton id="SearchButton" searchGiph={ this.searchGiph }/>
              <Link to="/favorites"><s.Button>favorites</s.Button></Link>
            </div>
        </b.Navbar>
        {this.props.children}
      </div>
    );
  };
};