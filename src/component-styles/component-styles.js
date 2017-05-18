import styled from 'styled-components';

export const Center = styled.div`
    margin: 0;
    auto;
`;

export const GifGallery = styled.div`
    margin: 0;
    auto;
    background: grey;
    overflow: hidden;
`;

export const GifPortrait= styled(GifGallery)`
    display: block;
    margin: 0 auto;
    margin-top: 10px
    margin-bottom: 10px
`;

export const GifFrame = styled.div`
    background: grey;
    float: left;
    margin-top: 10px
    margin-bottom: 10px
    width: 100%;
    @media (min-width: 760px) {
      width: 50%;
    }
`;

export const Gif = styled.img`
    background: grey;
    display: block;
    margin: 0 auto;
    width: 100%;
    @media (min-width: 760px) {
      width: 50%;
    }
`;

export const MetaData = styled.div`
    background: grey;
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
    background: #FFD700;
    border-radius: 8px;
    color: black;
`;

export const ShuffleButton = styled(Button)`
    background: green;
`;

export const FavoriteTheGifButton = styled(Button)`
  /* Adapt the colors based on primary prop */
  background: ${(props) => props.favorited ? 'palevioletred' : 'white'};
  color: ${(props) => props.favorited ? 'white' : 'palevioletred'};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;