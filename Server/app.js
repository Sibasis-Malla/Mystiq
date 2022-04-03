const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/stream/:APIkey', async(req, res) => {
    const { APIkey } = req.params;
    console.log(APIkey)
   await axios
    .post(
      "https://livepeer.com/api/stream",
      {
        name: "test_stream",
        profiles: [
          {
            name: "720p",
            bitrate: 2000000,
            fps: 30,
            width: 1280,
            height: 720,
          },
          {
            name: "480p",
            bitrate: 1000000,
            fps: 30,
            width: 854,
            height: 480,
          },
          {
            name: "360p",
            bitrate: 500000,
            fps: 30,
            width: 640,
            height: 360,
          },
        ],
      },
      {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${APIkey}`,
        },
      }
    ).then((response)=>{
        console.log("worked");
        console.log(response.data.streamKey)
        res.json(response.data);
    }).catch( error => {
        console.error(`Could not get products: ${error}`);
    });
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));