import React from 'react'
import styled from "styled-components";
import "./Loading.css"
const Loading = () => {
  return (
    <>
    {/* <div>Loading</div> */}
    {/* <Container>
      <div>
      <iframe src="https://giphy.com/embed/3oEjI6SIIHBdRxXI40" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen ></iframe> */}
      {/* <a href="https://giphy.com/gifs/mashable-3oEjI6SIIHBdRxXI40">via GIPHY</a></p> */}
      {/* </div>
    
    </Container> */}
     {/* <div id="load_animation" >
  <ion-icon name="earth-outline" class="animation"></ion-icon>
</div>

<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script> */}
<Container>
<div id="loading"></div>

</Container>
    </>
    
  )
}

export default Loading

const Container=styled.div`
height:90vh;
width:95vw;
display:flex;
align-items:center;
justify-content:center;
overflow:hidden;
`