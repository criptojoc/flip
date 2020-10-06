import backend from './endpoint';

export const removeDiceListener = () => {
  backend.socketAll.removeAllListeners('v1_games_dice_result');
};

export const onDiceChange = (callback) => {
  backend.socketAll.on('v1_games_dice_result', callback);
};


export const removeDiceStatsListener = () => {
  backend.socketAll.removeAllListeners('v1_games_dice_stats');
};

export const onDiceStatsChange = (callback) => {
  backend.socketAll.on('v1_games_dice_stats', callback);
};
