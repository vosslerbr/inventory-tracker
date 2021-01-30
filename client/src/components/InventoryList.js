import React, { Component } from "react";
import Item from "./Item";
import axios from "axios";
import "../styles/Item.css";

export default class InventoryList extends Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.incrementAmount = this.incrementAmount.bind(this);
    this.decrementAmount = this.decrementAmount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeSearchQuery = this.onChangeSearchQuery.bind(this);
    this.state = { items: [], searchQuery: "" };
  }

  componentDidMount() {
    axios
      .get("https://damp-reef-27996.herokuapp.com/api/items", {
        crossDomain: true,
      })
      .then((res) => this.setState({ items: res.data }));
  }

  onSubmit(e) {
    e.preventDefault();

    const searchQuery = this.state.searchQuery;
    console.log(searchQuery);

    axios
      .get(
        `https://damp-reef-27996.herokuapp.com/api/items/search/${searchQuery}`,
        {
          crossDomain: true,
        }
      )
      .then((res) => this.setState({ items: res.data }))

      .catch((err) => console.log(err));
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
        url: `https://damp-reef-27996.herokuapp.com/api/items/${id}`,
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

  onChangeSearchQuery(e) {
    this.setState({
      searchQuery: e.target.value,
    });
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
      .post(
        "https://damp-reef-27996.herokuapp.com/api/items/update/" + id,
        updatedItem
      )
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
      .post(
        "https://damp-reef-27996.herokuapp.com/api/items/update/" + id,
        updatedItem
      )
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
        <div>
          <form onSubmit={this.onSubmit}>
            <input type="text" onChange={this.onChangeSearchQuery} />
            <button type="submit">Search</button>
          </form>
        </div>
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
