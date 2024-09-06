const express = require('express');
const router = express.Router();
const { sendNotification } = require('../controller/firebasecontroller');

router.post('/send-notification', sendNotification);


module.exports = router;
