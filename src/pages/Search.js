import React from 'react';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';

class Search extends React.Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    const fetchMusics = await getMusics();
    this.setState({
      loading: false,
    }, fetchMusics);
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-search">
        {
          loading ? (
            <Loading />
          ) : (
            ''
          )
        }
      </div>
    );
  }
}

export default Search;
