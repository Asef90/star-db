import React, { Component } from 'react';

import Spinner from '../spinner';

const withData = (View, getData) => {
  return class extends Component {

    state = {
      itemList: null
    }

    componentDidMount() {
      getData()
        .then((itemList) => {
          this.setState({
            itemList
          });
        });
    };

    render() {
      const { itemList } = this.state;

      if (!itemList) {
        return <Spinner />
      }

      return <View { ...this.props } data={itemList} />;
    };
  };
};

export default withData;
