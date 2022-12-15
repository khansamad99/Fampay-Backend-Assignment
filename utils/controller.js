const express = require("express");
const dayjs = require("dayjs");
const { google } = require("googleapis");
const VideoModel = require("../models/video");


const getVideos = async (req,res)  => {
    const page = req.query.page || 0;
    const sortBy = req.query.sortBy || "publishedAt";
    const { q } = req.query;

    let videos
    let total
    try {
        if(q){
            videos = await VideoModel.fuzzySearch(q).sort({ [sortBy]: 1 });
            total = videos.length;
        }
        else{
            console.log("Inside GET API 4")
            total = await VideoModel.estimatedDocumentCount();
            videos = await VideoModel.find(
        {},
        {},
        {
          skip: page * 10,
          limit: 10,
        }
      ).sort({ [sortBy]: 1 });
    }
       
        const totalPages = Math.ceil(total / 10);
        const hasPrev = page > 0;
        const hasNext = page < totalPages;

        res.json({
        videos,
        total,
        totalPages,
        hasPrev,
        hasNext
        });   
        
    } catch (error) {
        res.status(500).json({msg: "Internal Server Error"})
    }
}

const fetchYTVideos = async (apiKey,q) => {
    try {
         const service = google.youtube({
            version: "v3",
            auth: apiKey,
          });
      
          const publishedAfter = dayjs().subtract(5, "minute").toISOString();
          const {
            data: { items },
          } = await service.search.list({
            part: ["snippet"],
            maxResults: 10,
            order: "date",
            q,
            publishedAfter,
          });
       
          const videos = items.map((item) => ({
            title: item.snippet.title,
            description: item.snippet.description,
            channelId: item.snippet.channelId,
            channelTitle: item.snippet.channelTitle,
            videoId: item.id.videoId,
            thumbnails: {
              default: item.snippet.thumbnails.default,
              medium: item.snippet.thumbnails.medium,
              high: item.snippet.thumbnails.high,
            },
            publishedAt: item.snippet.publishedAt,
          }));
      
          return videos;
    } catch (error) {
        console.error("Error in fetching videos",error)
    }
}

module.exports = {getVideos,fetchYTVideos}