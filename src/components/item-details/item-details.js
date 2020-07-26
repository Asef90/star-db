import React, { Component } from 'react';

import Spinner from '../spinner'
import SwapiService from '../../services/swapi-service'

import './item-details.css';

const Record = ({ item, field, label }) => {

  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Record };

export default class ItemDetails extends Component {
  swapiService = new SwapiService();

  state = {
    item: null,
    image: null
  };

  componentDidMount() {
    this.updateItem();
  };

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  };

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) {
      return;
    }

    this.setState({
      loading: true
    });

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(item),
          loading: false
        });
      });
  };

  render() {
    if (!this.state.item) {
      return <span>Select an item from list</span>
    }

    const { item, image, loading } = this.state;

    const itemDetails = (
      <ItemView item={item} image={image} records={this.props.children} />
    )

    const spinner = loading? <Spinner /> : null;
    const content = !loading ? itemDetails : null;

    return (

      <div className="item-details card">
        {spinner}
        {content}
      </div>
    );
  }
};

const ItemView = ({ item, image, records }) => {
  const { id, name, gender, birthYear, eyeColor } = item;

  return (
    <React.Fragment>
      <img className="item-image"
        src={image} />

      <div className="card-body">
        <h4>{name}</h4>

        <ul className="list-group list-group-flush">
          {
            React.Children.map(records, (record) => {
              return React.cloneElement(record, { item });
            })
          }
        </ul>
      </div>
    </React.Fragment>
  );
};
