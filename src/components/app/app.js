import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import PeoplePage from '../people-page';
import ErrorIndicator from '../error-indicator';

import ItemDetails, { Record } from '../item-details';
import Row from '../row';
import { StarshipList } from '../sw-components';
import { PersonDetails, PlanetDetails } from '../sw-components';

import './app.css'

export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    };

    const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

    const { getPerson, getStarship, getPersonImage, getStarshipImage } = this.swapiService;

    const personDetails = (
      <ItemDetails
        itemId={5}
        getData={getPerson}
        getImageUrl={getPersonImage}>

        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />

      </ItemDetails>
    )
    const starshipDetails = (
      <ItemDetails
        itemId={13}
        getData={getStarship}
        getImageUrl={getStarshipImage}>

        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />

      </ItemDetails>
    )

    return (
      <div className="todo-app">
        <Header />
        {planet}

        <button
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>

        <PeoplePage />
        <PersonDetails itemId={5} />
        <PlanetDetails itemId={13} />
        <StarshipList />

        <Row
          left={personDetails}
          right={starshipDetails} />

      </div>
    );
  };
};
