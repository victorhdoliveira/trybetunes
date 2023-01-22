import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    albumData: [],
    musicsList: [],
    favorites: [],
    loading: false,
    // isChecked: false,
  };

  componentDidMount() {
    this.getMusicsList();
    this.getFavorite();
  }

  getMusicsList = async () => {
    const { match: { params: { id } } } = this.props;
    const fetchMusics = await getMusics(id);
    const findCollection = fetchMusics[0];
    const findMusics = fetchMusics.filter((music, index) => index !== 0);
    this.setState({
      albumData: findCollection,
      musicsList: findMusics,
    });
  };

  getFavorite = async () => {
    this.setState({
      // loading: true,
    });
    const fav = await getFavoriteSongs();
    this.setState({
      // loading: false,
      favorites: [...fav],
    });
  };

  addAndRemove = async ({ target: { checked, value } }) => {
    const { musicsList } = this.state;
    const musics = musicsList.find((music) => music.trackId === Number(value));

    if (checked) {
      await addSong(musics);
    } else {
      await removeSong(musics);
    }
    this.getFavorite();
  };

  render() {
    const { albumData, musicsList, loading, favorites } = this.state;
    return (
      <div>
        { loading ? <Loading />
          : (
            <div data-testid="page-album">
              <Header />
              <section className="sectionMusic">
                <img
                  src={ albumData.artworkUrl100 }
                  alt={ albumData.collectionName }
                  className="AlbumImg"
                />
                <h2
                  data-testid="album-name"
                >
                  { albumData.collectionName}

                </h2>
                <h4 data-testid="artist-name" className="artist">
                  { albumData.artistName }

                </h4>
                {
                  musicsList.map((music, index) => (
                    <div key={ index } className="music">
                      <MusicCard
                        trackName={ music.trackName }
                        preview={ music.previewUrl }
                        trackId={ music.trackId }
                        isChecked={ favorites
                          .some((fav) => fav.trackId === music.trackId) }
                        addOrRemove={ this.addAndRemove }
                      />
                    </div>
                  ))
                }
              </section>
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
  // trackId: PropTypes.number.isRequired,
};

export default Album;
