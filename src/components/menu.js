import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Styled Components

const Title = styled.h1`
  font-size: 3em;
  font-family: monospace;
  text-align: center;
  color: palevioletred;
`;

const Button = styled.button`
  font-family: monospace;
  color: palevioletred;
  background: white;
  cursor: pointer;
  &:hover {
    color: white;
    background: palevioletred;
  }

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const Div = styled.div`
  text-align: center;
  padding: 10px;
`;

const DivLarger = styled.div`
  text-align: center;
  padding: 50px;
  margin-top: 30px;
`;

const ByText = styled.text`
  font: 13px monospace;
  color: grey;
`;

// const ImgContainer = styled.div`
//   text-align: center;
//   height: 400px;
//   padding: 20px;
// `;

const Img = styled.img`
  border-radius: 20px;
  box-shadow: 0 0 0 7px palevioletred;
  height: 400px;
  width: auto;
`;

// Component definition

function Menu() {
  const breedsURL = "https://dog.ceo/api/breeds/list/all";
  const [breeds, setBreeds] = useState([]);
  const [breed, setBreed] = useState("");
  const [dogImgURL, setDogImgURL] = useState("");

  // return breeds array from response
  const getBreeds = (r) => {
    let breedsList = [];
    for (const [key, val] of Object.entries(r.data.message)) {
      if (val.length > 0) {
        val.forEach((element) => breedsList.push(element + " " + key));
      } else {
        breedsList.push(key);
      }
    }
    return breedsList;
  };

  // set url of random dog image of specified breed b
  const getRandomDogImage = (b) => {
    if (b.length === 0) {
      console.log("No selection");
      setDogImgURL("");
    }
    const nameParts = b.split(" "); // split on space
    // australian terrier -> /terrier/australian
    var s = "";
    nameParts.reverse().forEach((part) => {
      s = s.concat("/", part);
    });
    const url = `https://dog.ceo/api/breed${s}/images`;
    axios.get(url).then((response) => {
      const imgs = response.data.message;
      var randomElement = imgs[Math.floor(Math.random() * imgs.length)];
      if (imgs.length > 1) {
        while (randomElement === dogImgURL) {
          randomElement = imgs[Math.floor(Math.random() * imgs.length)];
          console.log(randomElement, dogImgURL);
        }
        setDogImgURL(randomElement);
      }
    });
  };

  useEffect(() => {
    axios.get(breedsURL).then(function (response) {
      setBreeds(getBreeds(response));
    });
  }, []);

  return (
    <Div>
      <Title>🐕 Doge Viewer 🐕</Title>
      <Div>
        <label>
          <select defaultValue={""} onChange={(b) => setBreed(b.target.value)}>
            <option value="" disabled selected>
              Select Breed
            </option>
            {breeds.map((b) => (
              <option value={b} key={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
        <Button onClick={() => getRandomDogImage(breed)}>Show Dog 🐶</Button>
      </Div>
      <Div>
        <Img src={dogImgURL} alt={dogImgURL} />
      </Div>
      <DivLarger>
        <ByText>
          A React App by Paul Gan <br></br>
          Based on the <a href="https://dog.ceo/dog-api/">Dog API</a>
        </ByText>
      </DivLarger>
    </Div>
  );
}

export default Menu;
