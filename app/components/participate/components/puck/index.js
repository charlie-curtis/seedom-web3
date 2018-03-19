import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as bytes from '../../../../utils/bytes';
import Circles from './components/circles';
import Seed from './components/seed';
import Begin from './components/begin';
import Participate from './components/participate';
import Participated from './components/participated';
import Raise from './components/raise';
import Reveal from './components/reveal';
import End from './components/end';
import Select from './components/select';
import Withdraw from './components/withdraw';
import Cancel from './components/cancel';
import Cancelled from './components/cancelled';
import Ethereum from './components/ethereum';
import Network from './components/network';
import Account from './components/account';
import SeedFailed from './components/seedFailed';
import ParticipateFailed from './components/participateFailed';
import Ticket from './components/ticket';
import seedomLogo from '../../../../../../seedom-assets/logo/o/seedom-o-white-transparent.svg';
import './index.scss';

const PHASE_REFRESH = 1000;

const getPhase = (raiser) => {
  if (!raiser) {
    return null;
  }

  const now = Date.now();
  // participation phase
  if (now < raiser.endTime) {
    return 'participation';
  }

  // end phase
  if (now >= raiser.endTime && now < raiser.expireTime) {
    return 'end';
  }

  // expiration phase
  if (now >= raiser.expireTime && now < raiser.destructTime) {
    return 'expiration';
  }

  // destruction phase
  return 'destruction';
};

const getComponent = ({
  network,
  account,
  phase,
  state,
  participant,
  balances,
  isLoading,
  isParticipating,
  isTicketing,
  isRaising,
  isWithdrawing
}) => {
  // ethereum check
  if (!network) {
    return 'ethereum';
  }

  // network check
  if (!network.supported) {
    return 'network';
  }

  // account check
  if (!account) {
    return 'account';
  }

  // balances?
  if ((Object.keys(balances).length > 0) && isWithdrawing) {
    return 'withdraw';
  }

  // wait for state
  if (!state) {
    return null;
  }

  // selected participant
  if (!bytes.isZero20(state.selected)) {
    return 'select';
  }

  // cancelled?
  if (state.cancelled) {
    return 'cancelled';
  }

  // wait for a participant
  if (!participant) {
    return null;
  }

  // switch on phase
  switch (phase) {
    case 'participation':
      if (bytes.isZero32(state.charitySecret)) {
        return 'seed';
      }

      if (participant.message === '') {
        if (!isParticipating) {
          return 'begin';
        }
        return 'participate';
      }

      if (isTicketing) {
        return 'ticket';
      }

      if (!isRaising && !isLoading) {
        return 'participated';
      }

      return 'raise';

    case 'end':
      if (bytes.isZero32(state.charitySecret)) {
        return 'seedFailed';
      }

      if (participant.message === '') {
        return 'participateFailed';
      }

      if (state.charityMessage === '') {
        return 'reveal';
      }

      return 'end';

    case 'expiration':
      return 'cancel';

    default:
      return null;
  }
};

class Puck extends Component {
  static propTypes = {
    network: PropTypes.shape(),
    account: PropTypes.string,
    raiser: PropTypes.shape(),
    state: PropTypes.shape(),
    participant: PropTypes.shape(),
    balances: PropTypes.shape(),
    isLoading: PropTypes.bool,
    onParticipate: PropTypes.func.isRequired,
    onRaise: PropTypes.func.isRequired,
    onWithdraw: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  static defaultProps = {
    network: null,
    account: null,
    raiser: null,
    state: null,
    participant: null,
    balances: {},
    isLoading: false
  };

  constructor(props) {
    super(props);
    this.state = {
      phase: null,
      isParticipating: false,
      isTicketing: false,
      isRaising: false,
      isWithdrawing: true
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const newPhase = getPhase(this.props.raiser);
      // if the phase changed, update state
      if (newPhase !== this.state.phase) {
        this.setState({ phase: newPhase });
      }
    }, PHASE_REFRESH);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleBegin = () => {
    this.setState({ isParticipating: true });
  }

  handleParticipate = ({ message, entries }) => {
    this.setState({ isTicketing: true }, () => {
      this.props.onParticipate({ message, entries });
    });
  }

  handleTicketing = () => {
    this.setState({ isTicketing: true });
  }

  handleTicketingOver = () => {
    this.setState({ isTicketing: false });
  }

  handleRaising = () => {
    this.setState({ isRaising: true });
  }

  handleRaisingCancelled = () => {
    this.setState({ isRaising: false });
  }

  handleRaise = (entries) => {
    this.setState({ isRaising: false }, () => {
      this.props.onRaise(entries);
    });
  }

  handleWithdraw = (contractAddress) => {
    this.props.onWithdraw(contractAddress);
  }

  handleWithdrawSkipped = () => {
    this.setState({ isWithdrawing: false });
  }

  handleCancel = () => {
    this.props.onCancel();
  }

  render() {
    const {
      phase,
      isParticipating,
      isTicketing,
      isRaising,
      isWithdrawing
    } = this.state;

    const {
      network,
      account,
      raiser,
      state,
      participant,
      balances,
      isLoading
    } = this.props;

    const component = getComponent({
      network,
      account,
      phase,
      raiser,
      state,
      participant,
      balances,
      isLoading,
      isParticipating,
      isTicketing,
      isRaising,
      isWithdrawing
    });

    return (
      <div className="seedom-puck">
        <div className="intro">
          <img alt="seedom" src={seedomLogo} />
        </div>
        <div className="interface">
          <Circles percentage={50} isLoading={isLoading} raiser={raiser} />
          <Seed isShown={component === 'seed'} />
          <Begin isShown={component === 'begin'} raiser={raiser} onBegin={this.handleBegin} />
          <Participate isShown={component === 'participate'} raiser={raiser} isLoading={isLoading} onParticipate={this.handleParticipate} />
          <Ticket isShown={component === 'ticket'} account={account} raiser={raiser} participant={participant} onTicketingOver={this.handleTicketingOver} />
          <Participated isShown={component === 'participated'} participant={participant} onRaising={this.handleRaising} onTicketing={this.handleTicketing} />
          <Raise isShown={component === 'raise'} raiser={raiser} isLoading={isLoading} onRaise={this.handleRaise} onRaisingCancelled={this.handleRaisingCancelled} />
          <Reveal isShown={component === 'reveal'} />
          <End isShown={component === 'end'} />
          <Select isShown={component === 'select'} state={state} network={network} />
          <Withdraw isShown={component === 'withdraw'} balances={balances} isLoading={isLoading} onWithdraw={this.handleWithdraw} onWithdrawSkipped={this.handleWithdrawSkipped} />
          <Cancel isShown={component === 'cancel'} isLoading={isLoading} onCancel={this.handleCancel} />
          <Cancelled isShown={component === 'cancelled'} />
          <Ethereum isShown={component === 'ethereum'} />
          <Network isShown={component === 'network'} />
          <Account isShown={component === 'account'} />
          <SeedFailed isShown={component === 'seedFailed'} />
          <ParticipateFailed isShown={component === 'participateFailed'} />
        </div>
      </div>
    );
  }
}

export default Puck;