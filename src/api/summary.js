import backend from './endpoint';

export const removeSummaryListener = () => {
  backend.socket().close();
};

export const onSummaryChange = (wallet_address, callback) => {
  backend.socket(wallet_address).on('v1_update_summary', callback);
};
