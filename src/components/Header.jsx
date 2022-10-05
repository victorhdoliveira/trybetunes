import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    user: '',
    loading: true,
  };

  async componentDidMount() {
    const fetchUserName = await getUser();
    this.setState({
      user: fetchUserName.name,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <section>
        <header data-testid="header-component">
          <p data-testid="header-user-name">
            { loading ? <Loading /> : `Olá, ${user}!` }
          </p>
        </header>
        <nav>
          <p>
            <Link to="/search" data-testid="link-to-search">
              Pesquisar
            </Link>
          </p>
          <p>
            <Link to="/favorites" data-testid="link-to-favorites">
              Favoritas
            </Link>
          </p>
          <p>
            <Link to="/profile" data-testid="link-to-profile">
              Perfil
            </Link>
          </p>
        </nav>
      </section>
    );
  }
}

export default Header;
