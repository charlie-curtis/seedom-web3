import React from 'react';
import PropTypes from 'prop-types';
import Content from '../content';
import { localeDecimal, getEtherFromWei } from '../../../../../../utils/numbers';
import { Link } from 'react-router-dom';
import './index.scss';

class Welcome extends Content {
  static propTypes = {
    raiser: PropTypes.shape(),
    onBegin: PropTypes.func.isRequired
  };

  static defaultProps = {
    raiser: null
  };

  render() {
    const { className } = this.state;
    const { raiser, onCountMeIn } = this.props;

    let etherPerEntry;
    if (raiser) {
      etherPerEntry = localeDecimal(getEtherFromWei(raiser.valuePerEntry));
    }

    return (
      <div className={`seedom-content welcome ${className}`}>
        <div className="seedom-overlay layout">
          <div className="division text top small-pad">
            <div>
              <span>1 entry = {etherPerEntry}</span>
              <span className="ether">
                <i className="fas fa-bars" />
              </span>
            </div>
            <div className="supporting">now seeding</div>
          </div>
          <div className="division center">
            <div className="cause-logo" />
          </div>
          <div className="division bottom medium-pad">
            <div className="field">
              <div className="control">
                <Link className="button is-white is-outlined" to={`${ETH_PATH}help`}>how does this work?</Link>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <a className="button is-dark" onClick={onCountMeIn}>count me in!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
