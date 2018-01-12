import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as bytes from '../../utils/bytes';
import SeedomCircles from '../SeedomCircles';
import SeedomSeed from '../SeedomSeed';
import SeedomBegin from '../SeedomBegin';
import SeedomParticipate from '../SeedomParticipate';
import SeedomParticipated from '../SeedomParticipated';
import SeedomRaise from '../SeedomRaise';
import SeedomReveal from '../SeedomReveal';
import SeedomRevealed from '../SeedomRevealed';
import SeedomEnd from '../SeedomEnd';
import SeedomWin from '../SeedomWin';
import SeedomWithdraw from '../SeedomWithdraw';
import SeedomError from '../SeedomError';
import seedomLogo from '../../img/logos/seedom.svg';
import './index.scss';

const getPhase = ({
  hasMetamask,
  raiser,
  charityHashedRandom,
  hashedRandom,
  hasBegun,
  isRaising,
  random,
  winner,
  balance,
  isWithdrawSkipped
}) => {
  const now = Date.now();

  if (!hasMetamask) {
    return 'error-metamask';
  }

  if (balance > 0) {
    if (!isWithdrawSkipped) {
      return 'withdraw';
    }
  }

  if (now > raiser.kickoffTime && now < raiser.revealTime) {
    if (bytes.isZero32(charityHashedRandom)) {
      return 'seed';
    }

    if (bytes.isZero32(hashedRandom)) {
      if (!hasBegun) {
        return 'begin';
      }
      return 'participate';
    }

    if (!isRaising) {
      return 'participated';
    }
    return 'raise';
  }

  if (now > raiser.revealTime && now < raiser.endTime) {
    if (bytes.isZero32(charityHashedRandom)) {
      return 'error-charityHashedRandom';
    }

    if (bytes.isZero32(hashedRandom)) {
      return 'error-hashedRandom';
    }

    if (bytes.isZero32(random)) {
      return 'reveal';
    }

    return 'revealed';
  }

  if (bytes.isZero20(winner)) {
    if (bytes.isZero32(charityHashedRandom)) {
      return 'error-charityHashedRandom';
    }

    return 'end';
  }

  return 'win';
};

class SeedomPuck extends Component {
  static propTypes = {
    hasMetamask: PropTypes.bool.isRequired,
    raiser: PropTypes.shape({
      endTime: PropTypes.instanceOf(Date).isRequired,
      expireTime: PropTypes.instanceOf(Date).isRequired,
      kickoffTime: PropTypes.instanceOf(Date).isRequired,
      revealTime: PropTypes.instanceOf(Date).isRequired,
      valuePerEntry: PropTypes.number.isRequired
    }).isRequired,
    charityHashedRandom: PropTypes.string,
    entries: PropTypes.number,
    hashedRandom: PropTypes.string,
    random: PropTypes.string,
    winner: PropTypes.string,
    winnerRandom: PropTypes.string,
    balance: PropTypes.number,
    onParticipate: PropTypes.func.isRequired,
    onRaise: PropTypes.func.isRequired,
    onReveal: PropTypes.func.isRequired,
    onWithdraw: PropTypes.func.isRequired
  }

  static defaultProps = {
    charityHashedRandom: null,
    entries: 0,
    hashedRandom: null,
    random: null,
    winner: null,
    winnerRandom: null,
    balance: 0
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      hasBegun: false,
      isRaising: false,
      isWithdrawSkipped: false,
      now: new Date()
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        now: new Date()
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setLoading = loading => {
    this.setState({ isLoading: loading });
  }

  handleBegin = () => {
    this.setState({ hasBegun: true });
  }

  handleParticipate = ({ random, numOfEntries }) => {
    this.props.onParticipate({ random, numOfEntries });
  }

  handleGetMoreEntries = () => {
    this.setState({ isRaising: true });
  }

  handleRaise = ({ numOfEntries }) => {
    this.props.onRaise({ numOfEntries });
    this.setState({ isRaising: false });
  }

  handleReveal = ({ random }) => {
    this.props.onReveal({ random });
  }

  handleWithdraw = () => {
    this.props.onWithdraw();
  }

  handleWithdrawSkipped = () => {
    this.setState({ isWithdrawSkipped: true });
  }

  render() {
    const { hasBegun, isRaising, isLoading, isWithdrawSkipped } = this.state;
    const {
      hasMetamask,
      raiser,
      charityHashedRandom,
      hashedRandom,
      entries,
      random,
      winner,
      winnerRandom,
      balance
    } = this.props;

    const phase = getPhase({
      hasMetamask,
      raiser,
      charityHashedRandom,
      hashedRandom,
      random,
      hasBegun,
      isRaising,
      winner,
      balance,
      isWithdrawSkipped
    });

    return (
      <div className="seedom-puck">
        <div className="intro">
          <img alt="seedom" src={seedomLogo} />
        </div>
        <div className="interface">
          <SeedomCircles percentage={50} isLoading={isLoading} raiser={raiser} now={this.state.now} />
          <SeedomSeed isShown={phase === 'seed'} />
          <SeedomBegin isShown={phase === 'begin'} onBegin={this.handleBegin} />
          <SeedomParticipate isShown={phase === 'participate'} setLoading={this.setLoading} onParticipate={this.handleParticipate} />
          <SeedomParticipated isShown={phase === 'participated'} entries={entries} onGetMoreEntries={this.handleGetMoreEntries} />
          <SeedomRaise isShown={phase === 'raise'} setLoading={this.setLoading} onRaise={this.handleRaise} />
          <SeedomReveal isShown={phase === 'reveal'} setLoading={this.setLoading} onReveal={this.handleReveal} />
          <SeedomRevealed isShown={phase === 'revealed'} />
          <SeedomEnd isShown={phase === 'end'} />
          <SeedomWin isShown={phase === 'win'} winner={winner} winnerRandom={winnerRandom} />
          <SeedomWithdraw isShown={phase === 'withdraw'} balance={balance} onWithdraw={this.handleWithdraw} onWithdrawSkipped={this.handleWithdrawSkipped} />
          <SeedomError isShown={phase.startsWith('error')} error={phase} />
        </div>
      </div>
    );
  }
}

export default SeedomPuck;
