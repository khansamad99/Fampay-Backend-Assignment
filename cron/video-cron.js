const cron = require("node-cron");
const VideoModel = require("../models/video")
const dotenv = require('dotenv')
const {fetchYTVideos} = require('../utils/controller')


module.exports = () => {
    cron.schedule('* * * * *', async () => {
        try {
            const videos = await fetchYTVideos(
                process.env.YOUTUBE_API_KEY,
                "python"
              );
            await VideoModel.create(videos);
        } catch (error) {
            console.error("Error saving in DB")
        }
    });
}

