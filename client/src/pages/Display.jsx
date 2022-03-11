import React from "react";
import Dashboard from "../components/Dashboard";
import datas from "./data";
import styled from "styled-components";
const Display = () => {
  return (
    <Container>
      {datas.map((data) => {
        const { name, id, image } = data;
        return (
          <article key={id}>
            <Dashboard name={name} id={id} image={image} />
          </article>
        );
      })}
    </Container>
  );
};

export default Display;

const Container = styled.div`
  display: grid;
  /* Umderstand the below code in the video */
  grid-template-columns: repeat(3, auto);
  gap: 3rem 2rem;
  padding: 3rem 1rem;
  margin: 0.5rem 1.5px;

  border-top: 0.2px solid gray;
  margin-top: 5rem;
`;
