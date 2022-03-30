import React, { useEffect, useState } from "react";
import Dashboard from "../components/HomePage";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../helpers/Firebase";
import { Link } from "react-router-dom";

// import { database } from "../helpers/Firebase";
// import { ref, set, onValue,update,push,child } from "firebase/database";

const Display = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "data"));
      setData(querySnapshot.docs.map((doc) => doc.data()));
    })();
  }, []);
  console.log(data);
  return (
    <Container>
      {data.map((data) => {
        const { name, image, address, price,teamId,tokenUri } = data;
        console.log(name, image, address, price);
        return (
          <article>
            <Dashboard
              name={name}
              image={image}
              address={address}
              price={price}
              teamId = {teamId}
              tokenUri = {tokenUri}
            />
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
