/* global importScripts, firebase */
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyALKm0c_dSvNoDVbHaN4KEhsZ-POR2nixA',
  projectId: 'gt-link-consumer',
  messagingSenderId: '926268461357',
  appId: '1:926268461357:web:cd904468bc5ce688e283a4'
});

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(`ithoangtan -  ~ file: firebase-messaging-sw.js ~ line 16 ~ payload`, payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://i.pinimg.com/originals/57/93/fa/5793fa77a347969c747ecf703c2aee90.png',
    click_action: 'https://google.com',
    data: { url: process.env.HOST_NAME || 'https://google.com' }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  console.log(`ithoangtan -  ~ file: firebase-messaging-sw.js ~ line 28 ~ event`, event);
  // Click actions support only secure HTTPS URLs.
  let url = process.env.HOST_NAME || 'https://google.com';
  event.notification.close(); // Android needs explicit close.
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
