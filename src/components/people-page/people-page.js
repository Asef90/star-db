import React, { Component } from 'react';

import { PersonList } from '../sw-components';
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
    const personList = (
      <PersonList
        onItemSelected={this.onPersonSelected} />
    )

    const itemDetails = (
      <ErrorBoundry>
        <ItemDetails itemId={this.state.selectedPerson} />
      </ErrorBoundry>
    )

    return(
      <Row left={personList} right={itemDetails} />
    );
  };
};
