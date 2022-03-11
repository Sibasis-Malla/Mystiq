import React, { useState, useEffect } from "react";
import { fetchData } from "../helpers/livepeer";
import styled from "styled-components";

function StartStream(){
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
      <FormContainer>
        <form>
          <h3>Enter API Key </h3>
          <input type="text" name="LivepeerApiKey" onChange={handleAPIKey} />
          <div>
            <Button>
              <button onClick={handleSubmit}>Submit</button>
            </Button>
          </div>
        </form>
      </FormContainer>
    </div>
  );
}
export default StartStream;
const FormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  background: black;
  > form {
    background: #f9f9f9;
    padding: 25px;
    margin: 150px 0;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  }
  > button {
    font: 400 12px/16px "Roboto", Helvetica, Arial, sans-serif;
  }

  > h3 {
    display: block;
    font-size: 30px;
    font-weight: 300;
    margin-bottom: 10px;
  }
  > form > input {
    border: 2px solid black;
    margin: 0 0 10px;
    min-width: 100%;
    padding: 0;
    width: 100%;
    height: 1.5rem;
    margin-top: -20px;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: space-between;
  > button {
    cursor: pointer;
    width: 30%;
    border: none;
    background: #4caf50;
    color: #fff;
    /* margin: 0 0 5px; */
    padding: 10px;
    font-size: 15px;
    margin-top: auto;
  }
`;
