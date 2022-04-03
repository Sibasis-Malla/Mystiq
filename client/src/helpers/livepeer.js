import axios from "axios";
import { db } from "../helpers/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

const fetchData = async(APIkey,id) => {
  try {
    const response = await axios.get(`https://streamapiv1.herokuapp.com/api/stream/${APIkey}`);
    if(response){
      console.log(response.data);
      // console.log("addshfhcuihf");
      const streamKey = response.data.streamKey;
    const playbackId = response.data.playbackId;
     localStorage.setItem("streamKey", streamKey);
      localStorage.setItem("playbackId", playbackId);
      const q = query(collection(db, "data"), where("id", "==", id));
      const docGet = async () => {
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        querySnapshot.forEach((doci) => {
          console.log(doc.id);
          const docRef = doc(db, "data", doci.id);
          updateDoc(docRef, {
            playbackId: playbackId,
          }).then(() => {
            console.log("Updated");
          });
        });
      };
      docGet();
    }
  } catch (error) {
    console.log(error);
  }
  
}

// async function fetchDa(APIkey, id) {
//   await axios
//     .post(
//       "https://cors-anywhere.herokuapp.com/https://livepeer.com/api/stream",
//       {
//         name: "test_stream",
//         profiles: [
//           {
//             name: "720p",
//             bitrate: 2000000,
//             fps: 30,
//             width: 1280,
//             height: 720,
//           },
//           {
//             name: "480p",
//             bitrate: 1000000,
//             fps: 30,
//             width: 854,
//             height: 480,
//           },
//           {
//             name: "360p",
//             bitrate: 500000,
//             fps: 30,
//             width: 640,
//             height: 360,
//           },
//         ],
//       },
//       {
//           headers: {
//             "content-type": "application/json",
//             "authorization": `Bearer ${APIkey}`,
          
//         },
//       }
//     )
//     .then((response) => {
//       console.log(response.data.streamKey);
//       localStorage.setItem("streamKey", response.data.streamKey);
//       localStorage.setItem("playbackId", response.data.playbackId);
//       const q = query(collection(db, "data"), where("id", "==", id));
//       const docGet = async () => {
//         const querySnapshot = await getDocs(q);
//         console.log(querySnapshot);
//         querySnapshot.forEach((doci) => {
//           console.log(doc.id);
//           const docRef = doc(db, "data", doci.id);
//           updateDoc(docRef, {
//             playbackId: response.data.playbackId,
//           }).then(() => {
//             console.log("Updated");
//           });
//         });
//       };
//       docGet();

//       //console.log('Set at local Storage')
//     });
// }
async function request(APIkey) {
  await axios
    .post("https://livepeer.com/api/asset/request-upload", {
      headers: {
        "Access-Control-Allow-Origin":"https://livepeer.com/api/stream",
        "content-type": "application/json",
        "authorization": `Bearer ${APIkey}`,
      },
    })
    .then((response) => {
      console.log(response);
    });
}
export { fetchData, request };
