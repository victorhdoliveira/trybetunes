import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    loading: false,
    favorites: [],
  };

  async componentDidMount() {
    await this.getFavorites();
  }

  getFavorites = async () => {
    this.setState({
      loading: true,
    });
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favorites: [...favoritesSongs],
    });
  };

  removeFav = async ({ target: { value } }) => {
    const { favorites } = this.state;
    this.setState({ loading: true });
    const songCheck = favorites.find((fav) => fav.trackId === Number(value));
    await removeSong(songCheck);
    this.getFavorites();
  };

  favoriteMusics = (trackId) => {
    const { favorites } = this.state;
    if (favorites.length > 0) {
      return favorites.some((fav) => fav.trackId === trackId);
    } return false;
  };

  render() {
    const { loading, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading
          ? ''
          : (
            <div data-testid="">
              <div className="fav">
                {favorites.length > 0
                  ? favorites.map((fav, index) => (
                    <span key={ index } className="favAlbuns">
                      <img
                        src={ fav.artworkUrl100 }
                        alt={ fav.collectionName }
                        className="favImg"
                      />
                      <MusicCard
                        trackName={ fav.trackName }
                        preview={ fav.previewUrl }
                        trackId={ fav.trackId }
                        isChecked={ this.favoriteMusics(fav.trackId) }
                        addOrRemove={ this.removeFav }
                      />
                    </span>
                  ))
                  : <p className="notFav">Não há músicas favoritas salvas.</p>}
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default Favorites;
