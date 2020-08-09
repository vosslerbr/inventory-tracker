import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Item.css";

const Item = (props) => (
  <tr className="itemContainer" style={{ marginBottom: "2rem" }}>
    <td className="itemProperty">{props.item.partNumber}</td>
    <td className="itemProperty">{props.item.name}</td>
    <td className="itemProperty">{props.item.amount}</td>
    <td className="itemProperty">{props.item.category}</td>
    <td className="itemProperty">{props.item.instrument}</td>
    <td className="itemProperty">{props.item.date}</td>
    <td className="itemProperty">
      <Link to={"/update/" + props.item._id}>Update</Link>
    </td>
  </tr>
);

export default class InventoryList extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/items", { crossDomain: true })
      .then((res) => this.setState({ items: res.data }));
  }

  itemsList() {
    return this.state.items.map(function (currentItem, i) {
      return <Item item={currentItem} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h2>List</h2>
        <table>
          <thead>
            <tr>
              <th>Part Number</th>
              <th>Part Name</th>
              <th>Amount In Stock</th>
              <th>Category</th>
              <th>Instrument</th>
              <th>Date Modified</th>
            </tr>
          </thead>
          <tbody>{this.itemsList()}</tbody>
        </table>
      </div>
    );
  }
}
