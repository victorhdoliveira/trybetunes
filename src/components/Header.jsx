import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    user: '',
  };

  async componentDidMount() {
    const fetchUserName = await getUser();
    this.setState({
      user: fetchUserName.name,
    });
  }

  render() {
    const { user } = this.state;
    return (
      <section>
        <header data-testid="header-component">
          <p data-testid="header-user-name">
            { user }
          </p>
        </header>
        <nav>
          <ul>
            <li>
              <Link to="/search" data-testid="link-to-search">
                Pesquisar
              </Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">
                Favoritas
              </Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    );
  }
}

export default Header;
