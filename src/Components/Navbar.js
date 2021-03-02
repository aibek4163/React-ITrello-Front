import { Link } from "react-router-dom";

export function NavBar(props) {
  function Logout() {
    props.setAuth(false);
  }
  return (
    <div class="container-fluid pl-0 pr-0">
      <ul class="nav" style={{ backgroundColor: "#21598A" }}>
        <div class="d-flex mr-auto container">
          <li class="nav-item my-0 mr-md-auto">
            <Link to="/" class="nav-link active text-white">
              <h5>ITrello</h5>
            </Link>
          </li>
          <li class="nav-item">
            <Link
              class="nav-link text-white"
              to="/"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              All Cards
            </Link>
          </li>
          <li class="nav-item">
            <Link
              class="nav-link text-white"
              to="/business/"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Register
            </Link>
          </li>
          {props.isAuth === true ? (
            <li class="nav-item d-flex">
              <Link
                class="nav-link text-white"
                to="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {props.login}
              </Link>
              <Link
                class="nav-link text-white"
                to="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => Logout()}
              >
                Logout
              </Link>
            </li>
          ) : (
            <li class="nav-item">
              {/* <Nav.Link href="/signIn">Login</Nav.Link> */}
              <Link
                class="nav-link text-white"
                to="/signIn"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Login
              </Link>
            </li>
          )}
        </div>
      </ul>
    </div>
  );
}
