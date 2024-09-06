importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyCDMHNJkRYEk6aapR4vdsp8lFcGDomBEhg",
  authDomain: "oushnotification.firebaseapp.com",
  projectId: "oushnotification",
  storageBucket: "oushnotification.appspot.com",
  messagingSenderId: "165351367875",
  appId: "1:165351367875:web:ba8fce182226765edaee76",
  measurementId: "G-48G7NNFY2K"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const { title, body } = payload.notification;
  self.registration.showNotification(title, { body });
});
