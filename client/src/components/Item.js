import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import "../styles/Item.css";

export default class Item extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <tr
        className={`itemContainer ${
          this.props.lessThanLimit ? "needToOrder" : "noOrder"
        }`}
      >
        <td className="itemProperty">{this.props.item.partNumber}</td>
        <td className="itemProperty">{this.props.item.name}</td>
        <td className="itemProperty">{this.props.item.amount}</td>
        <td className="itemProperty">{this.props.item.category}</td>
        <td className="itemProperty">{this.props.item.instrument}</td>
        <td className="itemProperty">
          {this.props.item.date.substring(0, 10)}
        </td>
        <td className="itemProperty">
          <Link to={"/update/" + this.props.item._id}>
            <FiEdit className="editIcon" title="Edit Item" />
          </Link>
        </td>
        <td className="itemProperty">
          <div
            onClick={() => {
              this.props.deleteItem(this.props.item._id);
            }}
          >
            <FiTrash2 className="deleteIcon" title="Delete Item" />
          </div>
        </td>
        <td>
          <FiMinusCircle
            className="decrementIcon"
            onClick={() => {
              this.props.decrementAmount(
                this.props.item._id,
                this.props.item.partNumber,
                this.props.item.name,
                this.props.item.amount,
                this.props.item.category,
                this.props.item.orderLimit,
                this.props.item.instrument,
                this.props.item.lessThanLimit,
                this.props.itemId
              );
            }}
          />
          <FiPlusCircle
            className="incrementIcon"
            onClick={() => {
              this.props.incrementAmount(
                this.props.item._id,
                this.props.item.partNumber,
                this.props.item.name,
                this.props.item.amount,
                this.props.item.category,
                this.props.item.orderLimit,
                this.props.item.instrument,
                this.props.item.lessThanLimit,
                this.props.itemId
              );
            }}
          />
        </td>
      </tr>
    );
  }
}
