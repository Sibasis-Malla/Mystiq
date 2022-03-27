import React from "react";
import "../components/home.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const Dashboard = ({ name, address, image, price }) => {
  return (
    <>
      <div class="container-fluid col-md-12">
        <div class="card">
          <Image>
            <img
              src={image}
              style={{
                height: "250px",
                width: "350px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              class="card-img-top"
            />
          </Image>
          <div class="card-body">
            {name}
            <a class="d-grid btn btn-primary mx-auto">
              <Link
                to={address}
                onClick={() => localStorage.setItem("CurrentCreator", address)}
                style={{ textDecoration: "none", color: "#FFF" }}
              >
                Subscribe - {price}$/month
              </Link>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

const Image = styled.div`
  > img {
    height: 100%;
    width: 100%;
  }
`;
