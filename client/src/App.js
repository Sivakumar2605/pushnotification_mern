import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { getFirebaseToken, onForegroundMessage } from './firebaseconfig';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [firebaseToken, setFirebaseToken] = useState(null);

  useEffect(() => {
   
    if (Notification.permission === 'default' || Notification.permission === 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          alert('Please enable notifications in your browser settings to receive notifications.');
          console.log('Notification permission denied.');
        }
      });
    } else if (Notification.permission === 'granted') {
      console.log('Notification permission is already granted.');
    }

    
    getFirebaseToken()
      .then(token => {
        if (token) {
          console.log('FCM Token:', token);
          setFirebaseToken(token);
        }
      })
      .catch(error => {
        console.error('Error retrieving Firebase token:', error);
      });

  
    const handleForegroundMessages = () => {
      onForegroundMessage()
        .then((payload) => {
          console.log('Foreground message received:', payload);
          const { notification: { title, body } } = payload;

          if (Notification.permission === 'granted') {
            new Notification(title, { body });
          }
        })
        .catch(err => console.error('An error occurred while retrieving foreground message:', err));
    };

    handleForegroundMessages();

    const interval = setInterval(() => {
      handleForegroundMessages();
    }, 3000);

  
    return () => {
      clearInterval(interval);
      console.log('Cleanup function called.');
    };
  }, []);

  const sendTokenToBackend = () => {
    if (firebaseToken) {
      setIsLoading(true);
      console.log('Sending FCM token:', firebaseToken);

      const title = 'Test Notification';
      const body = 'Hi, this is a test notification';

      axios.post('/api/send-notification', {
        token: firebaseToken,
        title: title,
        body: body,
      })
      .then(response => {
        console.log('Token and notification details sent successfully:', response.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('An error occurred while sending the token and notification details:', err);
        setIsLoading(false);
      });
    } else {
      console.error('No Firebase token available.');
      alert('Firebase token not available. Please check your setup.');
    }
  };

  return (
    <div className="app">
      <button
        className="btn-primary"
        onClick={sendTokenToBackend}
        disabled={isLoading || !firebaseToken}
      >
        {isLoading ? 'Sending...' : 'Send Notification'}
      </button>
    </div>
  );
}
