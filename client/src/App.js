import "./App.css";
import { Component } from "react";
import axios from "axios";
import { Navbar } from "./components/navbar/navbar.component";
import { FriendFilter } from "./components/searchBar/search.component";
import { LeftBlockUserCard } from "./components/userBlock/userBlock.component";
import { P2PChatBox } from "./components/chatBox/chatBox.component";
// import { Authorization } from "./components/authorization/authorization.component";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { currentUser } from "../../server/controller/authController";

// const instance = axios.create({
//   withCredentials: true,
//   baseURL: SERVER,
// });

class App extends Component {
  constructor() {
    super();
    this.state = { currentUserName: "" };
    // this.Authorization = this.Authorization.bind(this);
    // this.ChatPage = this.ChatPage.bind(this);
  }
  onSubmitForm = async (event) => {
    event.preventDefault();
    const loginForm = event.target.closest("#loginForm");
    const userName = loginForm.querySelector("#username").value;
    const password = loginForm.querySelector("#password").value;
    // console.log(userName, password);
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/v1/users/login",
        data: {
          username: userName,
          password,
        },
      });
      // console.log(res);

      if (res.status == 200) {
        document.cookie = `jwt=${res.data.token}`;
        this.setState({ currentUserName: userName });
        // console.log(this.state.currentUserName);
        localStorage.setItem("rememberMe", this.state.currentUserName);
        window.location.href = "http://localhost:3000/";
      }
    } catch {
      alert("username or password is wrong, try again!");
    }
  };

  Authorization = () => {
    // console.log(this);
    return (
      <div>
        <form id="loginForm" onSubmit={this.onSubmitForm}>
          <input id="username" type="text" />
          <input type="password" name="" id="password" />
          <input type="submit" />
        </form>
      </div>
    );
  };
  ChatPage = () => {
    // check her if user is logged in or not in future
    // console.log(this);
    // console.log(localStorage.getItem("rememberMe"));
    return (
      <div className="App">
        <Navbar />
        <div className="appBody">
          <div className="leftBlock">
            {/* <FriendFilter /> */}
            <LeftBlockUserCard key="1" name="yash" />
            <LeftBlockUserCard key="2" name="priyanshu" />
          </div>
          <div className="rightBlock">
            <P2PChatBox />
          </div>
        </div>
      </div>
    );
  };
  componentDidMount() {
    // instance.get("v1/users/isLoggedIn").then((res) => {
    //   console.log(res);
    // });
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/authorization">
              <this.Authorization />
            </Route>
            <Route path="/">
              <this.ChatPage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
