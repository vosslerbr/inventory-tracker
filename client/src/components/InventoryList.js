import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import "../styles/Item.css";

const Item = (props) => (
  <tr className="itemContainer">
    <td className="itemProperty">{props.item.partNumber}</td>
    <td className="itemProperty">{props.item.name}</td>
    <td className="itemProperty">{props.item.amount}</td>
    <td className="itemProperty">{props.item.category}</td>
    <td className="itemProperty">{props.item.instrument}</td>
    <td className="itemProperty">{props.item.date.substring(0, 10)}</td>
    <td className="itemProperty">
      <Link to={"/update/" + props.item._id}>
        <FiEdit className="editIcon" />
      </Link>
    </td>
    <td className="itemProperty">
      <div
        onClick={() => {
          props.deleteItem(props.item._id);
        }}
      >
        <FiTrash2 className="deleteIcon" />
      </div>
    </td>
  </tr>
);

export default class InventoryList extends Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = { items: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/items", { crossDomain: true })
      .then((res) => this.setState({ items: res.data }));
  }

  itemsList() {
    return this.state.items.map((currentItem, i) => {
      return <Item item={currentItem} key={i} deleteItem={this.deleteItem} />;
    });
  }

  deleteItem(id) {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios({
        method: "delete",
        url: `http://localhost:5000/api/items/${id}`,
        headers: {},
      })
        // .delete("https://localhost:5000/api/items/" + id)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));

      this.setState({
        items: this.state.items.filter((el) => el._id !== id),
      });
    }
  }

  render() {
    return (
      <div className="appContainer">
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
