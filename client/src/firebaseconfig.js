import { initializeApp } from 'firebase/app';
import { getToken, getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCDMHNJkRYEk6aapR4vdsp8lFcGDomBEhg",
  authDomain: "oushnotification.firebaseapp.com",
  projectId: "oushnotification",
  storageBucket: "oushnotification.appspot.com",
  messagingSenderId: "165351367875",
  appId: "1:165351367875:web:ba8fce182226765edaee76",
  measurementId: "G-48G7NNFY2K"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// Register or retrieve the service worker
export const getOrRegisterServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    return navigator.serviceWorker
      .register('/firebase-messaging-sw.js', { scope: '/firebase-push-notification-scope' })
      .then((registration) => {
        console.log('Service Worker registered successfully with scope:', registration.scope);
        return registration;
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
        throw error;
      });
  }
  throw new Error('The browser does not support service workers.');
};


// Function to get Firebase token
export const getFirebaseToken = () =>
  getOrRegisterServiceWorker()
    .then((serviceWorkerRegistration) =>
      getToken(messaging, {
        vapidKey: "BEEoXFbFaxj3PD-VRINO4fymJPR_Tm8bM9RV4Vhx1L7K1400japDoAWFianyvdMs6iCNuY9i8XA1uQOyilINOOg", 
        serviceWorkerRegistration 
      })
    )
    .catch((err) => {
      console.error('An error occurred while retrieving token.', err);
    });

// Listen for foreground messages
export const onForegroundMessage = () =>
  new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));

// Generate FCM token and log it to the console
getFirebaseToken().then((token) => {
  if (token) {
    console.log('FCM Token:', token);
  } else {
    console.log('No registration token available. Request permission to generate one.');
  }
});

// Listen to foreground messages
onForegroundMessage().then((payload) => {
  console.log('Message received in the foreground:', payload);
});
