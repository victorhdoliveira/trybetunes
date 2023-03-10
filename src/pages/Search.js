import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    isDisable: true,
    artistName: '',
    albums: [],
    loading: false,
    phrase: '',
    notFound: '',
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

  handleClick = async () => {
    const { artistName } = this.state;
    const albumsData = await searchAlbumsAPI(artistName);
    this.setState({
      albums: albumsData,
      artistName: '',
      loading: true,
      phrase: `Álbuns de ${artistName}`,
      notFound: 'nenhum álbum foi encontrado',
    });
  };

  render() {
    const { isDisable, artistName, loading, albums, phrase, notFound } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form className="searchForm">
          <label htmlFor="search">
            <input
              data-testid="search-artist-input"
              value={ artistName }
              type="text"
              id="artistName"
              name="artistName"
              placeholder="Nome do Artista"
              onChange={ this.handleChangeSearchArtist }
              autoComplete="off"
              className="searchInput"
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ isDisable }
              onClick={ this.handleClick }
              className="searchBtn"
            >
              Pesquisar
            </button>
          </label>
        </form>
        <h2 className="albumsResult">{ phrase }</h2>
        <div className="albums">
          { albums.length && loading ? (
            albums.map((album, index) => (
              <div key={ index } className="album">
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  <img
                    src={ album.artworkUrl100 }
                    alt={ album.collectionId }
                    className="albumImg"
                  />
                </Link>
                <p className="albumName">
                  { album.collectionName }
                </p>
              </div>
            ))
          ) : <h2>{notFound}</h2>}
        </div>
      </div>
    );
  }
}

export default Search;
