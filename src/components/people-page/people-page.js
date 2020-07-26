import React, { Component } from 'react';

import ItemList from '../item-list';
import ItemDetails from '../item-details';
import Row from '../row'
import ErrorBoundry from '../error-boundry'

import './people-page.css';

import SwapiService from '../../services/swapi-service'

export default class PeoplePage extends Component {
  swapiService = new SwapiService();

  state = {
    selectedPerson: null
  };

  onPersonSelected = (selectedPerson) => {
    this.setState({
      selectedPerson
    });
  };

  render() {
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}>

        {(i) => (
          `${i.name} (${i.birthYear})`
        )}

      </ItemList>
    )

    const itemDetails = (
      <ErrorBoundry>
        <ItemDetails itemId={this.state.selectedPerson} />
      </ErrorBoundry>
    )

    return(
      <Row left={itemList} right={itemDetails} />
    );
  };
};
