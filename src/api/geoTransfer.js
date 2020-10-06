import backend from './endpoint';

export const removeGeoTransferListener = () => {
  backend.socketAll.removeAllListeners('v1_geo_transfer');
};

export const onGeoTransferChange = (callback) => {
  backend.socketAll.on('v1_geo_transfer', callback);
};
