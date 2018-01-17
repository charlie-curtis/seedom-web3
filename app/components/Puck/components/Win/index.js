import React, { Component } from 'react';
import Content from '../Content';
import Indicator from '../Indicator';
import './index.scss';
import charityLogo from '../../../../img/logos/charity.png';

class Win extends Content {
  render() {
    return (
      <div className={`seedom-content win ${this.state.className}`}>
        <Indicator type={this.props.isShown ? "win" : null} />
        <div className="seedom-overlay">
          <img src={charityLogo} />
        </div>
        <div className="seedom-overlay">
          <div className="congrats">CONGRATULATES</div>
        </div>
        <div className="seedom-overlay">
          <div className="random-title">THEIR MESSAGE TO THE WORLD</div>
          <div className="random">{this.props.winnerRandom}</div>
        </div>
        <div className="seedom-overlay">
          <a className="address" href={`https://etherscan.io/address/${this.props.winner}`} target="_blank">{this.props.winner}</a>
        </div>
      </div>
    );
  }
}

export default Win;