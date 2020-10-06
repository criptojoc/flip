import io from 'socket.io-client';

export const BACKEND_URL = 'https://app.cryptomdl.com';
export const TIMEOUT_BACKEND_REQUEST = 90 * 1000;

let socketAll = null;

const getSocketAll = () => {
  if (!socketAll) {
    socketAll = io(BACKEND_URL, {
      timeout: TIMEOUT_BACKEND_REQUEST,
      transports: process.env.NODE_ENV === 'production' ? ['polling', 'websocket'] : ['websocket'],
    });
  }
  return socketAll;
};

export default {
  socketAll: getSocketAll(),
};
