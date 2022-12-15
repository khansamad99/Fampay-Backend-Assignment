const express = require('express');
const app = express()
const dotenv = require('dotenv')
dotenv.config()

app.use(express.json())
// app.use('/api', require('./router.js'))

const PORT = process.env.PORT || 3333;
app.listen(PORT, console.log(`Server is live on ${PORT}`))