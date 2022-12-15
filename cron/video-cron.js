const cron = require("node-cron");
const VideoModel = require("../models/video")
const dotenv = require('dotenv')
const {fetchYTVideos} = require('../utils/controller')


const cronJob = async (req,res) => {
    cron.schedule('* * * * *', async () => {
        try {
            const videos = await fetchYTVideos(
                process.env.YOUTUBE_API_KEY,
                secrets.YOUTUBE_SEARCH_QUERY
              );
    
            await VideoModel.create(videos);
        } catch (error) {
            console.error("Error saving in DB")
        }
    });
}

module.exports = {cronJob}