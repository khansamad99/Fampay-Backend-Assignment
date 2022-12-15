const express = require('express');
const app = express()
const dotenv = require('dotenv')
const mongoose = require("mongoose");
dotenv.config()


mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo is Connected")
  })
  .catch((err) => {
    if (err) {
      console.log(`Failed to connect to MongoDB: ${err}`);
    }
  });

app.use(express.json())
// app.use('/api', require('./router.js'))

const PORT = process.env.PORT || 3333;
app.listen(PORT, console.log(`Server is live on ${PORT}`))