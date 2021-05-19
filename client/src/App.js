import "./App.css";
import { Component } from "react";
import axios from "axios";
import socketClient from "socket.io-client";
import { Navbar } from "./components/navbar/navbar.component";
import { FriendFilter } from "./components/searchBar/search.component";
import { LeftBlockUserCard } from "./components/userBlock/userBlock.component";
import { P2PChatBox } from "./components/chatBox/chatBox.component";
import { Authorization } from "./components/authorization/authorization.component";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const SERVER = "http://127.0.0.1:5000";
var socket = socketClient(SERVER);

// const instance = axios.create({
//   withCredentials: true,
//   baseURL: SERVER,
// });

class App extends Component {
  constructor() {
    super();
  }
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
              <Authorization />
            </Route>
            <Route path="/">
              <ChatPage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function ChatPage() {
  // check her if user is logged in or not in future

  return (
    <div className="App">
      <Navbar />
      <div className="appBody">
        <div className="leftBlock">
          {/* <FriendFilter /> */}
          <LeftBlockUserCard />
        </div>
        <div className="rightBlock">
          <P2PChatBox />
        </div>
      </div>
    </div>
  );
}
export default App;
