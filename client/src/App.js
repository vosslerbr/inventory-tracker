import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FiHome, FiPlus } from "react-icons/fi";
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
            <FiHome className="homeIcon" title="Go Home" />
          </Link>
          <Link to="/create" className="nav-link">
            <FiPlus className="addIcon" title="Add New Item" />
          </Link>
        </nav>
      </header>
      <Route path="/" exact component={InventoryList} />
      <Route path="/update/:id" component={UpdateItem} />
      <Route path="/create" component={CreateItem} />
    </Router>
  );
}

export default App;
