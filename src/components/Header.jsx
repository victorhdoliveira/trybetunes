import React from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import logo from '../imagem/logoRoxo.png';
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
      <section className="headerSection">
        <header data-testid="header-component">
          <div data-testid="header-user-name">
            { loading ? <Loading /> : '' }
          </div>
        </header>
        <nav>
          <img src={ logo } alt="logo" className="headerLogo" />
          <p className="headerBackG">
            <Link to="/search" data-testid="link-to-search" className="links">
              Pesquisar
            </Link>
          </p>
          <p className="headerBackG">
            <Link to="/favorites" data-testid="link-to-favorites" className="links">
              Favoritas
            </Link>
          </p>
          <p className="profile">
            <HiUserCircle className="profileIcon" />
            <Link to="/profile" data-testid="link-to-profile" className="profileLink">
              { user }
            </Link>
          </p>
        </nav>
      </section>
    );
  }
}

export default Header;
