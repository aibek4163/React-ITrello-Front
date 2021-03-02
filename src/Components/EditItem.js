import { Button, Card, Jumbotron, Modal, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

function ListTask({ newId }) {
  const history = useHistory();
  let { id } = useParams();
  const [listTasks, setTask] = useState([]);

  const [taskText, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    loadTasks();
  }, [newId]);

  const [showTask, setShowTask] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleShowTask = () => setShowTask(true);
  const handleCloseTask = () => setShowTask(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleEditTask = (event) => {};

  const handleEdit = (event) => {
    setShowTask(true);
  };

  const handleDone = (event) => {
    setDone(true);
  };

  const handleNameEditTask = (event) => {
    setText(event.target.value);
  };

  async function loadTasks() {
    let response = await fetch("http://localhost:8000/api/allTasks/" + id);
    let data = await response.json();
    setTask(data);
  }

  return (
    <div>
      {listTasks?.map((row) => (
        <Card className="mt-3 mb-4">
          <form>
            <Card.Body>
              <div className="form-group">
                <div className="d-flex justify-content-between">
                  <p>{row.taskText}</p>
                  <div className="">
                    <a
                      href={`/editTask/${row.id}/${id}`}
                      className="btn-info btn-sm mr-3"
                    >
                      Edit
                    </a>
                    {/* <a
                      href={`/editTask/${row.id}`}
                      className="btn-danger btn-sm"
                    >
                      Delete
                    </a> */}
                  </div>
                </div>
                <p>{row.addedDate}</p>
              </div>
              <div class="form-group form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                  onChange={handleDone}
                />
                {/* <Form className="ml-3 mb-1">
                  <Form.Check type="switch" id="custom-switch" />
                </Form> */}
                <label class="form-check-label" for="exampleCheck1">
                  Done
                </label>
              </div>
            </Card.Body>
          </form>
        </Card>
      ))}
    </div>
  );
}

function Tasks({ card_id }) {
  console.log(card_id + "card iddddd");
  const [task_id, setTaskId] = useState(0);
  const [taskText, setText] = useState("");
  const [date, SetDate] = useState("");
  const [done, SetDone] = useState(false);
  const [card, SetCard] = useState();
  const handleNameTask = (event) => {
    console.log(event.target.value);
    setText(event.target.value);
  };
  const handleDone = (event) => {
    SetDone(event.target.value);
  };

  const handleNewTask = (event) => {
    let date = new Date().toLocaleString().replace(/(.*)\D\d+/, "$1");
    SetDate(date);

    console.log(card + "card 88");
    const inputData = { taskText, addedDate: date, done, card };
    addTask(inputData);
    setText("");
    event.preventDefault();
  };

  async function addTask(data) {
    const response = await fetch(
      "http://localhost:8000/api/addTask/" + card_id,
      {
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
      }
    );
    let messData = await response.json();
    setTaskId(messData.id);
  }

  return (
    <>
      <Card>
        <form onSubmit={handleNewTask}>
          <Card.Body>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Create new card"
                type="text"
                onChange={handleNameTask}
              />
            </div>
            <Button type="submit" variant="info">
              ADD NEW TASK +
            </Button>
          </Card.Body>
        </form>
      </Card>
      <ListTask newId={task_id} />
    </>
  );
}

export function EditItem(props) {
  const history = useHistory();
  let { id } = useParams();
  const [name, setName] = useState("");
  const [addedDate, setDate] = useState("");
  const [cardId, setCardId] = useState(0);
  const [deletedId, setDeleteId] = useState(0);
  const [task_id, setTaskId] = useState(0);

  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  useEffect(() => {
    GetCardById(id);
  }, []);
  //   const [addedDate, setDate] = useState("");

  const handleNameEdit = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };
  const handleEdit = (event) => {
    let date = new Date().toLocaleString().replace(/(.*)\D\d+/, "$1");
    setDate(date);
    const inputData = { id, name, addedDate: date };
    console.log(inputData + " edited");
    EditCard(inputData);
    handleClose();
    event.preventDefault();
  };

  async function setData(data) {
    setCardId(data.id);
    setName(data.name);
    setDate(data.addedDate);
  }

  async function GetCardById(card_id) {
    console.log(card_id + "  idshka");
    let response = await fetch("http://localhost:8000/api/getCard/" + card_id);
    let data = await response.json();
    console.log(data);
    setData(data);
  }

  async function EditCard(data) {
    const response = await fetch("http://localhost:8000/api/editCard", {
      method: "PUT",
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
    console.log(messData);
  }

  async function toDeleteCard() {
    const inputData = { id, name, addedDate };
    DeleteCard(inputData);
    history.push("/");
  }

  async function DeleteCard(data) {
    const response = await fetch("http://localhost:8000/api/deleteCard", {
      method: "DELETE",
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
    setDeleteId(messData.id);
  }

  return (
    <>
      <div className="container mt-5">
        <Jumbotron style={{ backgroundColor: "#536D79" }}>
          <h1 style={{ color: "#C9DBE4" }}>{name}</h1>
          <p>{addedDate}</p>
          <p>
            <button className="btn btn-info" onClick={handleShow}>
              Edit
            </button>
            <button
              className="btn btn-danger ml-3"
              type="button"
              onClick={handleShowDelete}
            >
              Delete
            </button>
          </p>
        </Jumbotron>
        <Tasks card_id={id} delId={deletedId} />
      </div>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleEdit}>
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Edit Card
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="form-group">
              <label for="exampleInputEmail1">Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={name}
                onChange={handleNameEdit}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Edit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal
        size="lg"
        show={showDelete}
        onHide={handleCloseDelete}
        backdrop="static"
        keyboard={false}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Delete Card
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="form-group">
              <label for="exampleInputEmail1">Name</label>
              <p
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={name}
              >
                {name}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              type="button"
              onClick={handleCloseDelete}
            >
              Close
            </Button>
            <Button variant="danger" type="submit" onClick={toDeleteCard}>
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
