import * as React from "react";
import { Switch, Route } from "react-router-dom";
import io from "socket.io-client";
import Home from "./containers/Home/Home";

const socketContext = React.createContext(io("/"));

function App() {

  const socket = React.useContext(socketContext);
  return (
    <Switch>
      <Route path="/" render={() => <Home socket={socket} />} />
    </Switch>
  );
}

export default App;
