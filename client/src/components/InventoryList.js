import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import axios from "axios";
import "../styles/Item.css";
//import UpdateItem from "./UpdateItem";
//import { update } from "../../../server/models/Item";

const Item = (props) => (
  <tr
    className={`itemContainer ${
      props.lessThanLimit ? "needToOrder" : "noOrder"
    }`}
  >
    <td className="itemProperty">{props.item.partNumber}</td>
    <td className="itemProperty">{props.item.name}</td>
    <td className="itemProperty">{props.item.amount}</td>
    <td className="itemProperty">{props.item.category}</td>
    <td className="itemProperty">{props.item.instrument}</td>
    <td className="itemProperty">{props.item.date.substring(0, 10)}</td>
    <td className="itemProperty">
      <Link to={"/update/" + props.item._id}>
        <FiEdit className="editIcon" title="Edit Item" />
      </Link>
    </td>
    <td className="itemProperty">
      <div
        onClick={() => {
          props.deleteItem(props.item._id);
        }}
      >
        <FiTrash2 className="deleteIcon" title="Delete Item" />
      </div>
    </td>
    <td>
      <FiMinusCircle
        className="decrementIcon"
        onClick={() => {
          props.decrementAmount(
            props.item._id,
            props.item.partNumber,
            props.item.name,
            props.item.amount,
            props.item.category,
            props.item.orderLimit,
            props.item.instrument,
            props.item.lessThanLimit,
            props.itemId
          );
        }}
      />
      <FiPlusCircle
        className="incrementIcon"
        onClick={() => {
          props.incrementAmount(
            props.item._id,
            props.item.partNumber,
            props.item.name,
            props.item.amount,
            props.item.category,
            props.item.orderLimit,
            props.item.instrument,
            props.item.lessThanLimit,
            props.itemId
          );
        }}
      />
    </td>
  </tr>
);

export default class InventoryList extends Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.incrementAmount = this.incrementAmount.bind(this);
    this.decrementAmount = this.decrementAmount.bind(this);
    this.state = { items: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/items", { crossDomain: true })
      .then((res) => this.setState({ items: res.data }));
  }

  itemsList() {
    return this.state.items.map((currentItem, i) => {
      return (
        <Item
          item={currentItem}
          key={i}
          itemId={i}
          deleteItem={this.deleteItem}
          incrementAmount={this.incrementAmount}
          decrementAmount={this.decrementAmount}
          lessThanLimit={currentItem.amount < currentItem.orderLimit}
        />
      );
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

  incrementAmount(
    id,
    partNumber,
    name,
    amount,
    category,
    orderLimit,
    instrument,
    lessThanLimit,
    itemId
  ) {
    const updatedItem = {
      partNumber: partNumber,
      name: name,
      amount: amount + 1,
      orderLimit: orderLimit,
      category: category,
      instrument: instrument,
      lessThanLimit: lessThanLimit,
    };

    axios
      .post("http://localhost:5000/api/items/update/" + id, updatedItem)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    const newState = this.state.items.slice();
    newState[itemId].amount++;
    this.setState({ items: newState });
  }
  decrementAmount(
    id,
    partNumber,
    name,
    amount,
    category,
    orderLimit,
    instrument,
    lessThanLimit,
    itemId
  ) {
    const updatedItem = {
      partNumber: partNumber,
      name: name,
      amount: amount - 1,
      orderLimit: orderLimit,
      category: category,
      instrument: instrument,
      lessThanLimit: lessThanLimit,
    };

    axios
      .post("http://localhost:5000/api/items/update/" + id, updatedItem)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    const newState = this.state.items.slice();
    newState[itemId].amount--;
    this.setState({ items: newState });
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
