import React, { Component } from 'react';

export class Map extends Component {
  render() {
    return (
      <div>
        <h2>City Name: {this.props.cityData.display_name}</h2>
        <text>Lat :{this.props.cityData.lat}</text>
        <br></br>
        <text>Lat :{this.props.cityData.lon}</text>
        <br></br>
        <br></br>
        <img
          src={`https://maps.locationiq.com/v3/staticmap?key=pk.6609fd5454fe4ca80f3cbe836300bba0&q&center=${this.props.cityData.lat},${this.props.cityData.lon}`}
          alt=""
        />
      </div>
    );
  }
}

export default Map;