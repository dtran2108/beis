export const getCurrentPosition = (callback) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      callback,
      (err) => {
        console.error('🚀 ~ file: location.js ~ line 7 ~ awaitnavigator.geolocation.getCurrentPosition ~ err', err);
      },
      { timeout: 60000 }
    );
  }
};
