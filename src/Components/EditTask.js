import { useState, useEffect } from "react";
import { ListTask } from "./EditItem";
import { Button, Card, CardDeck } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
export function EditTask(props) {
  const history = useHistory();
  const [task_new_id, setId] = useState(0);
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [card, setCard] = useState();
  let { task_id } = useParams();
  let { card_id } = useParams();

  console.log(card_id);

  const handleNameTask = (event) => {
    setTask(event.target.value);
  };

  useEffect(() => {
    GetTaskById();
  }, []);

  const handleNewTask = (event) => {
    let date = new Date().toLocaleString().replace(/(.*)\D\d+/, "$1");
    setDate(date);
    const inputData = { id: task_id, taskText: task, addedDate: date, card };
    console.log(inputData + " edited");
    EditTask(inputData);
    event.preventDefault();
  };

  async function setData(data) {
    setId(data.id);
    setTask(data.taskText);
    setDate(data.addedDate);
    setCard(data.card);
    console.log(data.card + " cardddd");
  }

  async function GetTaskById() {
    let response = await fetch(
      "http://localhost:8000/api/getTask/" + task_id + "/" + card_id
    );
    let data = await response.json();
    console.log(data);
    setData(data);
  }

  async function EditTask(data) {
    const response = await fetch("http://localhost:8000/api/editTask", {
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
    history.push("/editCard/" + card_id);
  }

  async function toDeleteTask() {
    const inputData = { id: task_id, taskText: task, addedDate: date, card };
    DeleteTask(inputData);
    history.push("/editCard/" + card_id);
  }

  async function DeleteTask(data) {
    const response = await fetch("http://localhost:8000/api/deleteTask", {
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
    //setDeleteId(messData.id);
  }

  return (
    <>
      <div className="container mt-4">
        <Card>
          <form onSubmit={handleNewTask}>
            <Card.Body>
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder="Edit task"
                  type="text"
                  onChange={handleNameTask}
                  value={task}
                />
              </div>
              <Button type="submit" variant="info">
                Edit
              </Button>
              <Button
                type="button"
                className="ml-3"
                onClick={toDeleteTask}
                variant="danger"
              >
                Delete
              </Button>
            </Card.Body>
          </form>
        </Card>
      </div>
    </>
  );
}
