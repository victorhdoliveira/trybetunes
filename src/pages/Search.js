import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    isDisable: true,
    artistName: '',
  };

  handleChangeSearchArtist = ({ target }) => {
    const { value } = target;
    this.setState({
      artistName: value,
    }, () => {
      const { artistName } = this.state;
      const minLength = 2;
      const validation = artistName.length < minLength;
      this.setState({ isDisable: validation });
    });
  };

  render() {
    const { isDisable, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search">
            <input
              data-testid="search-artist-input"
              value={ artistName }
              type="text"
              placeholder="Nome do Artista"
              onChange={ this.handleChangeSearchArtist }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ isDisable }
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
