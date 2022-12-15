const express = require('express');
const {getVideos} = require('./utils/controller')

router.route('/videos').get(getVideos);