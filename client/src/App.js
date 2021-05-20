import "./App.css";
import { Component } from "react";
import axios from "axios";
import { FriendFilter } from "./components/searchBar/search.component";
import { LeftBlockUserCard } from "./components/userBlock/userBlock.component";
import { P2PChatBox } from "./components/chatBox/chatBox.component";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./components/navbar/navbar.style.css";
import { NavbarSearchBar } from "./components/searchBar/search.component";
class App extends Component {
  constructor() {
    super();
    this.state = {
      isloggedIn: false,
      userId: "",
      recentChat: [],
      username: "",
    };
  }
  onSubmitForm = async (event) => {
    event.preventDefault();
    const loginForm = event.target.closest("#loginForm");
    const userName = loginForm.querySelector("#username").value;
    const password = loginForm.querySelector("#password").value;
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/v1/users/login",
        data: {
          username: userName,
          password,
        },
      });
      if (res.status == 200) {
        document.cookie = `jwt=${res.data.token}`;
        this.setState({ currentUserName: userName });
        localStorage.setItem("token", res.data.token);
        window.location.href = "http://localhost:3000/";
      }
    } catch {
      alert("username or password is wrong, try again!");
    }
  };

  Authorization = () => {
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
  letCheck = async () => {
    if (!this.state.isloggedIn) {
      try {
        const res = await axios({
          method: "GET",
          url: "http://localhost:5000/v1/users/isLoggedIn",
          params: {
            token: localStorage.getItem("token"),
          },
        });
        if (res.status == 200) {
          this.setState({
            isloggedIn: true,
            userId: res.data.user._id,
            recentChat: res.data.user.chatWith,
            username: res.data.user.username,
          });
        }
      } catch {}
    }
  };
  ChatPage = () => {
    return (
      <div className="App">
        <this.Navbar />
        <div className="appBody">
          <div className="leftBlock">
            <LeftBlockUserCard recentChat={this.state.recentChat} />
          </div>
          <div className="rightBlock">
            <P2PChatBox />
          </div>
        </div>
      </div>
    );
  };
  componentDidMount() {
    this.letCheck();
    this.logout();
  }
  logout = async () => {
    if (this.state.isloggedIn) {
      try {
        const res = await axios({
          method: "GET",
          url: "http://localhost:5000/v1/users/logout",
          params: {
            token: localStorage.getItem("token"),
          },
        });
        if (res.status == 200) {
          localStorage.setItem("token", "");
          this.setState({
            isloggedIn: false,
            userId: "",
            recentChat: [],
            username: "",
          });
        }
      } catch {}
    }
  };

  Navbar = () => {
    return (
      <div className="navbar">
        <NavbarSearchBar />
        <div>{this.state.username}</div>
        <button onClick={this.logout}>LogOut</button>
      </div>
    );
  };

  render() {
    {
      this.letCheck();
    }
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/authorization">
              {this.state.isloggedIn && <this.ChatPage />}
              {!this.state.isloggedIn && <this.Authorization />}
            </Route>
            <Route path="/">
              {this.state.isloggedIn && <this.ChatPage />}
              {!this.state.isloggedIn && <this.Authorization />}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
