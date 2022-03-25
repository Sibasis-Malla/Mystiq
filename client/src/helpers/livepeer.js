import axios from "axios";



async function fetchData (APIkey){

    await axios.post('https://livepeer.com/api/stream',
            {
             name: "test_stream",
             profiles: [
               {
                 "name": "720p",
                 "bitrate": 2000000,
                 "fps": 30,
                 "width": 1280,
                 "height": 720
               },
               {
                 "name": "480p",
                 "bitrate": 1000000,
                 "fps": 30,
                 "width": 854,
                 "height": 480
               },
               {
                 "name": "360p",
                 "bitrate": 500000,
                 "fps": 30,
                 "width": 640,
                 "height": 360
               }
             ]
           },
           {
           headers: {
             "content-type": "application/json",
             authorization: `Bearer ${APIkey}`
           }
     }).then((response)=>{
       console.log(response.data.streamKey)
      localStorage.setItem('streamKey',response.data.streamKey)
      localStorage.setItem('playbackId',response.data.playbackId)
      //console.log('Set at local Storage')
     })

   } 
   async function request(APIkey){
     await axios.post('https://livepeer.com/api/asset/request-upload',
     {
      
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${APIkey}`
        }
  }
     ).then((response)=>{
       console.log(response)
     })

   }
   export  {fetchData,request};