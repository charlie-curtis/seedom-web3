import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.scss';

class Toggle extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    collapsed: PropTypes.bool,
    children: PropTypes.element
  };

  static defaultProps = {
    collapsed: true,
    children: null
  };

  constructor(props) {
    super(props);
    this.state = {
      collapsed: props.collapsed
    };
  }

  toggle = () => {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed
    }));
  };

  render() {
    const { title } = this.props;
    const { collapsed } = this.state;
    return (
      <div
        className={classnames('seedom-toggle', { collapsed })}
        onClick={this.toggle}
      >
        <div className="header">
          <span className="toggle left">
            <i className="fas fa-plus" />
          </span>
          <span className="text">{title}</span>
        </div>
        { !collapsed && (
          <div className="content has-text-white">
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}

export default Toggle;
