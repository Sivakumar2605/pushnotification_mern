const admin = require('../serveice/notificationserveice');


async function sendNotification(req, res) {
  const { token, title, body } = req.body;
  console.log(token, title, body);

  if (!token || !title || !body) {
    return res.status(400).json({ success: false, message: 'Token, title, and body are required' });
  }

  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    return res.status(200).json({ success: true, message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}


module.exports = {
  sendNotification,
};
