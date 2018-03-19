import React from 'react';
import PropTypes from 'prop-types';
import Content from '../content';
import Indicator from '../indicator';
import * as etherscan from '../../../../../../utils/etherscan';
import './index.scss';

class Select extends Content {
  static propTypes = {
    isShown: PropTypes.bool.isRequired,
    state: PropTypes.shape(),
    network: PropTypes.shape()
  };

  static defaultProps = {
    state: null,
    network: null
  };

  render() {
    const { className } = this.state;
    const { isShown, state, network } = this.props;

    let charityMessage;
    let ownerMessage;
    let selectedMessage;
    if (state) {
      ({ charityMessage, ownerMessage, selectedMessage } = state);
    }

    return (
      <div className={`seedom-content selection ${className}`}>
        <Indicator type={isShown ? 'selection' : null} />
        <div className="seedom-overlay layout">
          <div className="division text top small-pad">
            <div className="charity-logo small" />
          </div>
          <div className="division text center narrow">
            <div className="left">
              <div className="header">charity message</div>
              <div className="value">{charityMessage}</div>
            </div>
            <div className="right">
              <div className="header">owner message</div>
              <div className="value">{ownerMessage}</div>
            </div>
          </div>
          <div className="division text bottom small-pad slim">
            <div className="header">selected message</div>
            <div className="value">{selectedMessage}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Select;