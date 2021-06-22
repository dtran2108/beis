const statePath = 'authUser';

const userData = (state) => state[statePath].user;

export const getAuthUser = (state) => userData(state);

export const getAuthen = (state) => state[statePath].isAuthenticated;

export const getQRCode = (state) => state[statePath].QRCode;

export const getTypeLogin = (state) => state[statePath].type;

export const getDistanceRadius  = (state) => state[statePath].distance
