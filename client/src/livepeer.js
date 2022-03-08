import axios from "axios";

const lst = [];  
const populateData = (data) => {lst.push(data)} 

function fetchData (APIkey){
 lst.pop();
    axios.post('https://livepeer.com/api/stream',
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
      populateData(response);
     })

   } 
   export  {fetchData,lst};