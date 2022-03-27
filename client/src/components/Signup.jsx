import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { collection, addDoc } from "firebase/firestore";
import {db} from "../helpers/Firebase";

import Sidebar from "./Sidebar";
import {
    createIndex,
  } from "../helpers/superfluid";
import { ConstantFlowAgreementV1 } from "@superfluid-finance/sdk-core";
function Signup() {
  const [image, setImage] = useState("");
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [price,setPrice] = useState();
  const[Url,setUrl] = useState("");
  const UploadImage=async ()=>{
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "mystiq")
    data.append("cloud_name","doybtqm8h")
     await fetch("https://api.cloudinary.com/v1_1/doybtqm8h/image/upload",{
    method:"post",
    body: data
    })
    .then(resp => resp.json())
    .then(data => {
        setUrl(data.url)
        console.log(Url)
        console.log(data.url)
        try {
            const docRef = addDoc(collection(db, "data"), {
              name,address,price, image: data.url
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    })
    .catch(err => console.log(err))
    }
  const handleImage = (event) => {
    setImage( event.target.files[0]);
  };
  const handleName = (event) => {
    setName(() => ([event.target.name] = event.target.value));
  };
  const handleAddress = (event) => {
    setAddress(() => ([event.target.name] = event.target.value));
  };
  const handlePrice = (event) => {
    setPrice(() => ([event.target.name] = event.target.value));
  };
  const handleSubmit = async() => {
    UploadImage();
  };
  return (
    <>
      <Sidebar />
      <form>
        <div className="container-fluid col-md-6">
          <h2 className="d-flex justify-content-center my-2">Sign Up</h2>
          <div className="mb-3">
            <label for="Name" className="form-label">
              Name
            </label>
            <input
              name="Name"
              onChange={handleName}
              type="text"
              className="form-control"
              id="Name"
              placeholder="Name"
            />
          </div>
          <div className="mb-3">
            <label for="address" className="form-label">
             Address
            </label>
            <input
              name="address"
              onChange={handleAddress}
              type="text"
              className="form-control"
              id="address"
              placeholder="Address"
            />
          </div>
          <div className="mb-3">
              Image
            <div className="input-group mb-3">
                
              <input
                type="file"
                className="form-control"
                id="inputGroupFile02"
                onChange={handleImage}
              />
              <label className="input-group-text" for="inputGroupFile02">
                Upload
              </label>
            </div>
            <div className="mb-3">
            <label for="Name" className="form-label">
              Price
            </label>
            <input
              name="Price"
              onChange={handlePrice}
              type="number"
              className="form-control"
              id="Price"
              placeholder="Price"
            />
          </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="d-grid btn btn-success my-3 col-2 mx-auto"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
export default Signup;
