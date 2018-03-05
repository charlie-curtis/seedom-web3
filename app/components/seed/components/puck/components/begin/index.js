import React from 'react';
import Content from '../content';
import { localeDecimal, getEtherFromWei } from '../../../../../../utils/numbers';
import './index.scss';

class Begin extends Content {
  render() {
    const { className } = this.state;
    const { raiser, onBegin } = this.props;

    return (
      <div className={`seedom-content begin ${className}`}>
        <div className="seedom-overlay layout medium-pad">
          <div className="division text top">
            <div>
              1 entry = {localeDecimal(getEtherFromWei(raiser.valuePerEntry))}
              <span className="ether">Ξ</span>
            </div>
            <div className="supporting">now seeding</div>
          </div>
          <div className="division center">
            <div className="charity-logo" />
          </div>
          <div className="division bottom large-pad">
            <div className="field">
              <div className="control">
                <a className="button is-dark" onClick={onBegin}>obtain entries</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Begin;
