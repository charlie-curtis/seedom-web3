import React from 'react';
import classnames from 'classnames';
import logo from '../../img/logos/seedom-white@4x.png';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavToggle = ({ onClick }) => (
  <span className="navbar-burger burger" onClick={onClick}>
    <span />
    <span />
    <span />
  </span>
);

NavToggle.propTypes = {
  onClick: PropTypes.func.isRequired
};

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavBurgerActive: false
    };
  }

  handleNavToggle = () => {
    this.setState({
      isNavBurgerActive: !this.state.isNavBurgerActive
    });
  }

  handleNavLink = () => {
    this.setState({
      isNavBurgerActive: false
    });
  }

  render() {
    const { isNavBurgerActive } = this.state;

    return (
      <div className="hero-head">
        <nav className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <img src={logo} alt="Seedom - Seeding the future of philanthropy" />
              </a>
              <NavToggle onClick={this.handleNavToggle} />
            </div>
            <div className={classnames('navbar-menu', { 'is-active': isNavBurgerActive })}>
              <div className="navbar-start">
                <NavLink className="navbar-item" activeClassName="is-active" to={ETH_PATH} onClick={this.handleNavLink} exact>PARTICIPATE</NavLink>
                <NavLink className="navbar-item" activeClassName="is-active" to={`${ETH_PATH}vote`} onClick={this.handleNavLink} exact>VOTE</NavLink>
                <NavLink className="navbar-item" activeClassName="is-active" to={`${ETH_PATH}history`} onClick={this.handleNavLink} exact>HISTORY</NavLink>
                <NavLink className="navbar-item" activeClassName="is-active" to={`${ETH_PATH}help`} onClick={this.handleNavLink} exact>HELP</NavLink>
                <NavLink className="navbar-item" activeClassName="is-active" to={`${ETH_PATH}about`} onClick={this.handleNavLink} exact>ABOUT</NavLink>
              </div>
              <div className="navbar-end">
                <a className="navbar-item" href="https://medium.com/@seedom.io">
                  <span className="icon">
                    <i className="fab fa-lg fa-medium" />
                  </span>
                </a>
                <a className="navbar-item" href="http://reddit.com/r/FUNDRAISER_io">
                  <span className="icon">
                    <i className="fab fa-lg fa-reddit" />
                  </span>
                </a>
                <a className="navbar-item" href="https://www.facebook.com/seedom.io">
                  <span className="icon">
                    <i className="fab fa-lg fa-facebook" />
                  </span>
                </a>

                <a className="navbar-item" href="https://twitter.com/FUNDRAISER_io">
                  <span className="icon">
                    <i className="fab fa-lg fa-twitter" />
                  </span>
                </a>

                <a className="navbar-item" href="https://www.instagram.com/seedom.io/">
                  <span className="icon">
                    <i className="fab fa-lg fa-instagram" />
                  </span>
                </a>

                <a className="navbar-item" href="https://t.me/seedomio">
                  <span className="icon">
                    <i className="fab fa-lg fa-telegram" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
