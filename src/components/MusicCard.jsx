import PropTypes from 'prop-types';
import React from 'react';

class MusicCard extends React.Component {
  render() {
    const { track, preview } = this.props;
    return (
      <div>
        <p>{ track }</p>
        <audio data-testid="audio-component" src={ preview } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento.
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
};

export default MusicCard;
