import React from "react";
import "../components/home.css"
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";




const Dashboard = ({ name, address, image }) => {
  return (
    <>
    <div class="container-fluid col-md-12">
        <div class="card">
        <img src={image}  class="card-img-top" />
        <div class="card-body">
          
          <a class="d-grid btn btn-primary mx-auto">
          <Link
              to={address}
              onClick={() => localStorage.setItem("CurrentCreator",address)}
              style={{ textDecoration: "none", color: "#FFF" }}
            >
              {name}
            </Link>
          </a>
        </div>
      </div>       
        </div>
    
    </>
  );
};

export default Dashboard;


