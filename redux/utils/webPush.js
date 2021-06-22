import 'firebase/messaging';
import firebase from 'firebase/app';
import localforage from 'localforage';

const firebaseConfig = {
  apiKey: 'AIzaSyALKm0c_dSvNoDVbHaN4KEhsZ-POR2nixA',
  projectId: 'gt-link-consumer',
  messagingSenderId: '926268461357',
  appId: '1:926268461357:web:cd904468bc5ce688e283a4'
};

let messaging = null;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const init = async () => {
  messaging = await firebase.messaging();
};

export const getToken = async (setTokenFound) => {
  return messaging
    .getToken()
    .then((currentToken) => {
      if (currentToken) {
        console.log(`ithoangtan -  ~ file: webPush.js ~ line 30 ~ .then ~ currentToken`, currentToken);
        localforage.setItem('fcm_token', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
