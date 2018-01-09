import React, { Component } from 'react';
import SeedomContent from '../SeedomContent';
import './index.scss';
import eff from './eff.png';

class SeedomEnd extends SeedomContent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`seedom-content seed ${this.state.className}`}>
        <div className="seedom-overlay">
          <img src={eff} />
        </div>
        <div className="seedom-overlay">
          <div className="top-message">WAITING FOR</div>
          <div className="bottom-message">CHARITY TO REVEAL</div>
        </div>
      </div>
    );
  }
}

export default SeedomEnd;
