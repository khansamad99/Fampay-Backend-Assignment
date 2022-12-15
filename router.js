const express = require('express');
const {getVideos} = require('./utils/controller')
const router = express.Router()

router.route('/videos').get(getVideos);

module.exports = router