import {
  Button,
  Card,
  CardDeck,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router-dom";

<script
  src="https://kit.fontawesome.com/cb41621c2c.js"
  crossorigin="anonymous"
></script>;

export function CardTask({ ItemAdded }) {
  const [listCard, setCard] = useState([]);

  async function loadData() {
    let response = await fetch("http://localhost:8000/api/allCards");
    let listCard = await response.json();
    setCard(listCard);
  }

  useEffect(() => {
    loadData();
  }, [ItemAdded]);

  return (
    <CardDeck>
      {listCard?.map((row) => (
        <Card style={{ minWidth: "350px", maxWidth: "254px" }} className="mb-3">
          <Card.Body>
            <Card.Title>{row.name}</Card.Title>
            {/* <Card.Link to="#">DETAILS</Card.Link> */}
            <a href={`/editCard/${row.id}`}>DETAILS</a>
          </Card.Body>
          <Card.Footer>{row.addedDate}</Card.Footer>
        </Card>
      ))}
    </CardDeck>
  );
}

function SearchCard(props) {
  const [name, setName] = useState("");
  const [colorCustom, setColor] = useState("#21598A");
  const [iconColor, setIconColor] = useState("white");
  const [cancelSearch, setCancel] = useState(false);
  const history = useHistory();

  const handleName = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
    searchData(name);
    setColor("white");
    setIconColor("black");
    setCancel(true);
  };

  const handleCancel = (event) => {
    event.target.value = "";
    props.setSearchName("");
    setCancel(false);
    setColor("#21598A");
    setIconColor("white");
    props.setSearched(false);
    setName("");
    //history.push("/");
  };

  const handleSubmit = (event) => {
    setName("");
    event.preventDefault();
  };

  const changeColor = (event) => {
    setColor("white");
  };

  async function searchData(name) {
    // const response = await fetch(
    //   "http://localhost:8000/api/searchCard/" + name
    // );
    // let messData = await response.json();
    // console.log(messData);
    // setCard(messData);
    // setName("");
    // if (name === "") {
    //   name = " ";
    // }
    axios
      .get(`http://localhost:8000/api/searchCard/${name}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          props.setCard(response.data);
          props.setSearched(true);
        }
      });
    props.setSearchName(name);
  }

  useEffect(() => {
    searchData(name);
  }, [name]);

  return (
    <>
      <div className="input-group input-group-lg">
        <div className="input-group-prepend">
          <div
            className="input-group-text"
            id="btnGroupAddon"
            style={{ backgroundColor: colorCustom }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill={iconColor}
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
        </div>
        <input
          className="form-control "
          style={{ backgroundColor: colorCustom }}
          onChange={handleName}
          // onClick={changeColor}
        />
        {cancelSearch === true ? (
          <div className="input-group-append ">
            <button
              onClick={handleCancel}
              className="input-group-text bg-white"
              id="basic-addon2"
            >
              X
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

function ResultSearch(props) {
  return (
    <>
      <h4 className="mt-3">Search results for:"{props.searchName}"</h4>
      {props.listCard.length === 0 ? (
        <div className="offset-4 col-4 mt-5">
          <h1>Results Not Found</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            fill="red"
            className="bi bi-slash-circle ml-5"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z" />
          </svg>
        </div>
      ) : (
        <>
          <CardDeck className="mt-5">
            {props.listCard?.map((row) => (
              <Card
                style={{ minWidth: "350px", maxWidth: "254px" }}
                className="mb-3"
              >
                <Card.Body>
                  <Card.Title>{row.name}</Card.Title>
                  {/* <Card.Link to="#">DETAILS</Card.Link> */}
                  <a href={`/editCard/${row.id}`}>DETAILS</a>
                </Card.Body>
                <Card.Footer>{row.addedDate}</Card.Footer>
              </Card>
            ))}
          </CardDeck>
        </>
      )}
    </>
  );
}

export function AddNewCard(props) {
  const [name, setName] = useState("");
  const [newId, setNewId] = useState(0);
  const [addedDate, setDate] = useState("");
  const [isSearched, setSearched] = useState(false);
  const [listCard, setCard] = useState([]);
  const [searchName, setSearchName] = useState("");

  const handleName = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };
  const handleDate = (event) => {
    setDate(event.target.value);
  };
  const handleSubmit = (event) => {
    let date = new Date().toLocaleString().replace(/(.*)\D\d+/, "$1");
    setDate(date);
    const inputData = {
      name,
      addedDate: date,
    };
    addCard(inputData);
    setName("");
    event.preventDefault();
  };

  async function addCard(data) {
    const response = await fetch("http://localhost:8000/api/addcard", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    let messData = await response.json();
    setNewId(messData.id);
  }

  return (
    <>
      <div className="mt-4">
        <SearchCard
          isSearched={isSearched}
          setSearched={setSearched}
          listCard={listCard}
          setCard={setCard}
          setSearchName={setSearchName}
        />
      </div>
      {isSearched === true && searchName.length !== 0 ? (
        <ResultSearch
          listCard={listCard}
          setSearchName={setSearchName}
          searchName={searchName}
        />
      ) : (
        <>
          {" "}
          <div className="col-6 offset-3 mt-5">
            <Card>
              <form onSubmit={handleSubmit}>
                <Card.Body>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="Create new card"
                      type="text"
                      value={name}
                      onChange={handleName}
                    />
                  </div>
                  <Button type="submit" variant="info">
                    <i class="fab fa-amazon"></i>
                    ADD NEW CARD +
                  </Button>
                </Card.Body>
              </form>
            </Card>
          </div>
          <div className="mt-4">
            <CardTask ItemAdded={newId} />
          </div>{" "}
        </>
      )}
    </>
  );
}

export function Home(props) {
  return (
    <div className="container ">
      <AddNewCard />
    </div>
  );
}
