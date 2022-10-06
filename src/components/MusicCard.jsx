import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    favorites: [],
    loading: false,
    isChecked: false,
  };

  componentDidMount() {
    this.getFavorite();
  }

  getFavorite = async () => {
    const { trackId } = this.props;
    this.setState({
      loading: true,
    });
    const getSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      isChecked: getSongs.some((e) => e.trackId === trackId),
    });
  };

  removeChecked = async ({ target: { checked } }) => {
    const { trackId } = this.props;
    this.setState({
      loading: true,
    });
    const rmv = await removeSong(trackId);
    this.setState({
      loading: false,
      isChecked: checked ? rmv : false,
    });
  };

  AddFavoriteSong = async () => {
    const { trackId } = this.props;
    this.setState({
      loading: true,
      isChecked: true,
    });
    await addSong(trackId);
    const { favorites } = this.state;
    this.setState({
      loading: false,
      favorites: [favorites],
    });
  };

  render() {
    const { trackName, preview, trackId } = this.props;
    const { loading, isChecked } = this.state;
    return (
      <div>
        { loading ? <Loading />
          : (
            <div>
              <p>{ trackName }</p>
              <audio data-testid="audio-component" src={ preview } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento.
                <code>audio</code>
              </audio>
              <label htmlFor={ trackName }>
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId} ` }
                  onChange={ this.AddFavoriteSong }
                  checked={ isChecked }
                  value={ trackId }
                  onClick={ this.removeChecked }
                />
                {' '}
                favorita
              </label>
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
