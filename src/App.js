import "./App.css";
import { NavBar } from "./Components/Navbar";
import { Home } from "./Components/MainBody";
import { EditItem } from "./Components/EditItem";
import { EditTask } from "./Components/EditTask";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";



function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/login">
          <h1>Login Page</h1>
        </Route>
        <Route path={`/editCard/:id`}>
          <EditItem />
        </Route>
        <Route path={`/editTask/:task_id/:card_id`}>
          <EditTask />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
