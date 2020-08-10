import React, { Component } from "react";
import axios from "axios";
import "../styles/Create.css";

export default class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partNumber: "",
      name: "",
      amount: 0,
      orderLimit: 0,
      category: "",
      instrument: "",
      lessThanLimit: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangePartNumber = this.onChangePartNumber.bind(this);
    this.onChangePartName = this.onChangePartName.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeOrderLimit = this.onChangeOrderLimit.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeInstrument = this.onChangeInstrument.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted`);

    const newItem = {
      partNumber: this.state.partNumber,
      name: this.state.name,
      amount: this.state.amount,
      orderLimit: this.state.orderLimit,
      category: this.state.category,
      instrument: this.state.instrument,
      lessThanLimit: this.state.lessThanLimit,
    };

    axios
      .post("http://localhost:5000/api/items", newItem)
      .then((res) => console.log(res.data));

    this.setState({
      partNumber: "",
      name: "",
      amount: 0,
      orderLimit: 0,
      category: "",
      instrument: "",
      lessThanLimit: false,
    });
  }

  onChangePartNumber(e) {
    this.setState({
      partNumber: e.target.value,
    });
  }
  onChangePartName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeAmount(e) {
    this.setState({
      amount: e.target.value,
    });
  }
  onChangeOrderLimit(e) {
    this.setState({
      orderLimit: e.target.value,
    });
  }
  onChangeCategory(e) {
    this.setState({
      category: e.target.value,
    });
  }
  onChangeInstrument(e) {
    this.setState({
      instrument: e.target.value,
    });
  }

  render() {
    return (
      <div className="createContainer">
        <h2>Create</h2>
        <form onSubmit={this.onSubmit}>
          <div className="inputLabel">
            <label>Part Number</label>
            <p className="inputAside">Don't include any dashes</p>
          </div>

          <input
            type="text"
            required
            value={this.state.partNumber}
            onChange={this.onChangePartNumber}
          />
          <div className="inputLabel">
            <label>Part Name</label>
            <p className="inputAside">What's this part called?</p>
          </div>

          <input
            type="text"
            required
            value={this.state.name}
            onChange={this.onChangePartName}
          />
          <div className="inputLabel">
            <label>Amount</label>
            <p className="inputAside">How many do we have?</p>
          </div>

          <input
            type="number"
            required
            value={this.state.amount}
            onChange={this.onChangeAmount}
          />
          <div className="inputLabel">
            <label>Order Limit</label>
            <p className="inputAside">
              How many should we have to trigger an order?
            </p>
          </div>

          <input
            type="number"
            required
            value={this.state.orderLimit}
            onChange={this.onChangeOrderLimit}
          />
          <div className="inputLabel">
            <label>Category</label>
            <p className="inputAside">i.e. Brass, Woodwind, Percussion</p>
          </div>

          <input
            type="text"
            required
            value={this.state.category}
            onChange={this.onChangeCategory}
          />
          <div className="inputLabel">
            <label>Instrument</label>
            <p className="inputAside">i.e. Flute, Clarinet, Alto Sax...</p>
          </div>

          <input
            type="text"
            required
            value={this.state.instrument}
            onChange={this.onChangeInstrument}
          />
          <button type="submit">Confirm Changes</button>
        </form>
      </div>
    );
  }
}
