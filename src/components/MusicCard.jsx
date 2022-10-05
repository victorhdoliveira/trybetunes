import PropTypes from 'prop-types';
import React from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    favorites: [],
    loading: false,
    isChecked: false,
  };

  AddFavoriteSong = async () => {
    const { song } = this.props;
    this.setState({
      loading: true,
      isChecked: true,
    });
    const addingSong = await addSong(song);
    const { favorites } = this.state;
    this.setState({
      loading: false,
      favorites: [...favorites, addingSong],
    });
  };

  render() {
    const { track, preview, trackId } = this.props;
    const { loading, isChecked } = this.state;
    return (
      <div>
        { loading ? <Loading />
          : (
            <div>
              <p>{ track }</p>
              <audio data-testid="audio-component" src={ preview } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento.
                <code>audio</code>
              </audio>
              <label htmlFor={ track }>
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId} ` }
                  onChange={ this.AddFavoriteSong }
                  checked={ isChecked }
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
  track: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  song: PropTypes.shape({}).isRequired,
};

export default MusicCard;
