import React from "react";
import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { StoreProvider, createStore } from "easy-peasy";
import globalStore from "./stores/globalStore";
import Home from "./UI/home/home";

const store = createStore(globalStore);

function App() {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
        </Switch>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
