import PropTypes from 'prop-types';
import React from 'react';

class MusicCard extends React.Component {
  render() {
    const { trackName, preview, trackId, isChecked, addOrRemove } = this.props;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ preview } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento.
          <code>audio</code>
        </audio>
        <label htmlFor={ trackName } className="checkbox">
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId} ` }
            value={ trackId }
            checked={ isChecked }
            onChange={ addOrRemove }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  preview: PropTypes.string,
  trackId: PropTypes.number,
  addOrRemove: PropTypes.func,
  isChecked: PropTypes.bool,
}.isRequired;

export default MusicCard;
