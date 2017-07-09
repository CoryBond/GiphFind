import styled from 'styled-components';
//import {Navbar, Nav, NavItem, DropdownButton, MenuItem, Button} from 'react-bootstrap'


export const Center = styled.div`
    margin: 0;
    auto;
`;

export const GifGallery = styled.div`
    margin: 0;
    auto;
    background: #E0F2F1;
    overflow: hidden;
`;

export const GifPortrait= styled(GifGallery)`
    display: block;
    margin: 0 auto;
    margin-top: 10px
    margin-bottom: 10px
`;

export const GifFrame = styled.div`
    background: #E0F2F1;
    float: left;
    margin-top: 10px
    margin-bottom: 10px
    width: 100%;
    @media (min-width: 760px) {
      width: 50%;
    }
`;

export const Gif = styled.img`
    background: #E0F2F1;
    display: block;
    margin: 0 auto;
    width: 100%;
    @media (min-width: 760px) {
      width: 50%;
    }
`;

export const MetaData = styled.div`
    margin: 0 auto;
    background: #E0F2F1;
    float: left;
    width: 100%;
`;

export const FullScreen = styled.div`
    position:absolute;
    background-color: black;
    top:0;
    left:0;
    bottom:0;
    right:0;
    height:100%;
    width:100%;
`;

export const Button = styled.button`
    background: #009688;
    border-radius: 8px;
    color: black;
`;

export const ShuffleButton = styled(Button)`
    background: #00695C;
`;

export const FavoriteTheGifButton = styled(Button)`
  /* Adapt the colors based on primary prop */
  background: ${(props) => props.favorited ? '#00796B' : 'white'};
  color: ${(props) => props.favorited ? 'white' : '#00796B'};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #00796B;
  border-radius: 3px;
`;