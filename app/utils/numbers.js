import { BigNumber } from 'bignumber.js';

const weiInEther = new BigNumber(1000000000000000000);

const getEtherFromWei = (bigNumber) => {
  return bigNumber.dividedBy(weiInEther);
};

const localeDecimal = (bigNumber, places) => {
  return bigNumber.toFormat(places);
};

const localeNumber = (bigNumber) => {
  return bigNumber.toFormat(0);
};

const zero = () => {
  return new BigNumber(0);
};

export {
  getEtherFromWei,
  localeNumber,
  localeDecimal,
  zero
};
