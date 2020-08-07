import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./styles/Global.css";
import InventoryList from "./components/InventoryList";
import UpdateItem from "./components/UpdateItem";
import CreateItem from "./components/CreateItem";

function App() {
  return (
    <Router>
      <header>
        <h1>Inventory Tracker</h1>
        <nav>
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/create" className="nav-link">
            Create Item
          </Link>
          <Link to="/update" className="nav-link">
            Update Item
          </Link>
        </nav>
      </header>
      <Route path="/" exact component={InventoryList} />
      <Route path="/update" component={UpdateItem} />
      <Route path="/create" component={CreateItem} />
    </Router>
  );
}

export default App;
