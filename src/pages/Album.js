import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    albumData: [],
    musicsList: [],
  };

  componentDidMount() {
    this.getMusicsList();
    // this.getFavorite();
  }

  // Passei essa função para o componente MusicCard
  // getFavorite = async () => {
  //   this.setState({ loading: true });
  //   const getSongs = await getFavoriteSongs();
  //   // // console.log(getSongs);
  //   this.setState({
  //     loading: false,
  //   });
  // };

  getMusicsList = async () => {
    const { match: { params: { id } } } = this.props;
    const fetchMusics = await getMusics(id);
    const findCollection = fetchMusics[0];
    const findMusics = fetchMusics.filter((music, index) => index !== 0);
    // console.log(findMusics);
    this.setState({
      albumData: findCollection,
      musicsList: findMusics,
    });
  };

  render() {
    const { albumData, musicsList, loading } = this.state;
    return (
      <div>
        { loading ? <Loading />
          : (
            <div data-testid="page-album">
              <Header />
              <img src={ albumData.artworkUrl100 } alt={ albumData.collectionName } />
              <p data-testid="album-name">{ albumData.collectionName}</p>
              <p data-testid="artist-name">{ albumData.artistName }</p>
              {
                musicsList.map((music, index) => (
                  <div key={ index }>
                    <MusicCard
                      trackName={ music.trackName }
                      preview={ music.previewUrl }
                      trackId={ music.trackId }
                    />
                  </div>
                ))
              }
            </div>
          )}
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
