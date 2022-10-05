import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    albumData: [],
    musicsList: [],
  };

  componentDidMount() {
    this.getMusicsList();
  }

  getMusicsList = async () => {
    const { match: { params: { id } } } = this.props;
    const fetchMusics = await getMusics(id);
    const findCollection = fetchMusics[0];
    const findMusics = fetchMusics.filter((music, index) => index !== 0);
    console.log(findCollection);
    this.setState({
      albumData: findCollection,
      musicsList: findMusics,
    });
  };

  render() {
    const { albumData, musicsList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <img src={ albumData.artworkUrl100 } alt={ albumData.collectionName } />
        <p data-testid="album-name">{ albumData.collectionName}</p>
        <p data-testid="artist-name">{ albumData.artistName }</p>
        {
          musicsList.map((music, index) => (
            <div key={ index }>
              <MusicCard track={ music.trackName } preview={ music.previewUrl } />
            </div>
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default Album;
