import React ,{useState,useEffect }from "react";
import {fetchData} from "../helpers/livepeer";

function StartStream(props){
    const [LivepeerApiKey,setKey] = useState("");
    const handleSubmit =  async(event)=>{
        event.preventDefault();
        console.log(LivepeerApiKey)
        await fetchData(LivepeerApiKey)
        //console.log('After FetchData() is called')
      }
      const handleAPIKey = (event) => {
       setKey(()=>([event.target.name] = event.target.value))
       console.log(LivepeerApiKey)
      };
      
   
    return( 
    <div>
        <form>
            Enter API Key
            <input type="text"
            name="LivepeerApiKey"
            onChange={handleAPIKey}
            />
            <div>
            <button onClick={handleSubmit}>
                Submit
            </button>
            </div>

        </form>
        </div>
)
}
export default StartStream