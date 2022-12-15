 

<h1 align="center">
<img  width="30" src="https://user-images.githubusercontent.com/77020164/146640192-61300696-16fd-4e8d-be1e-226ba1f90c52.png"/>
Fampay - Backend Assignment 
</h1>


### Project Goal ✨

To make an API to fetch latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.

## About it :scroll:	

* Choose any search query, for example: official, cricket, football and GET API will returns the stored video data in a paginated response sorted in descending order of published datetime.
* Search query key is stored in env file and API will be using from there


## Tech Stack :memo:
 * NodeJS
 * YouTube data v3 API
 * MongoDB

### Development

1. Clone the project

`git clone https://github.com/khansamad99/Fampay-Backend-Assignment`

2. Add these .env[Have Provided them on mail]

```
# For default values, refer `.env.defaults` file
MONGODB_URI = 
YOUTUBE_API_KEY=
SEARCH_QUERY=
```
3. Install dependencies

`npm install`

4. Run in development mode

`npm start`

5. API Route

PORT:3333
Sampple : `http://localhost:3333/api/videos?q=python`
