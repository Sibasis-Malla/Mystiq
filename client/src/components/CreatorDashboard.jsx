import React from "react";


function StartStream(props){

    return( 
    <div>
        <form>
            Enter API Key
            <input type="text"
            name="LivepeerApiKey"
            onChange={props.handC}
            />
            <div>
            <button onClick={props.submit}>
                Submit
            </button>
            <button onClick={props.show}>Show</button>
            </div>

        </form>
        </div>
)
}
export default StartStream