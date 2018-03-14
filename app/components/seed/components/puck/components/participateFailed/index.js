import React from 'react';
import PropTypes from 'prop-types';
import Content from '../content';
import Indicator from '../indicator';

class ParticipateFailed extends Content {
  static propTypes = {
    isShown: PropTypes.bool.isRequired
  };

  render() {
    const { className } = this.state;
    const { isShown } = this.props;
    return (
      <div className={`seedom-content seed-failed ${className}`}>
        <Indicator type={isShown ? 'error' : null} />
        <div className="seedom-overlay layout">
          <div className="division top">
            <div className="charity-logo" />
          </div>
          <div className="division text bottom giant-pad narrow">
            <span>raiser no longer accepting participants, stay tuned for selection</span>
          </div>
        </div>
      </div>
    );
  }
}

export default ParticipateFailed;