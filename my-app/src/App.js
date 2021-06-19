import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './component/Footer';
import Header from './component/Header';
import './App.css';
import Form from './component/From';
import Weather from './component/Weather';
import Movies from './component/Movies';
import Alertm from './component/Alert';
import Map from './component/Map';
import axios from 'axios';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorMassage: false,
      cityName: '',
      errMss: '',
      cityData: {},
      displayData: false,
      weatherData: [],
      lat: '',
      lon: '',
      movies: [],
      showMovie: false,
      showWeather: false, 
      city: this.props.userInput,
    };
  }
  updateCityName = (e) => {
    this.setState({
      cityName: e.target.value, 
    });
  };

  getCitydata = async (e) => {
    e.preventDefault();

    await axios
      .get(
        `https://us1.locationiq.com/v1/search.php?key=pk.6609fd5454fe4ca80f3cbe836300bba0&q=${this.state.cityName}&format=json`
      )
      .then((response) => {
        this.setState({
          cityData: response.data[0],
          displayData: true,
          showErrorMassage: false,
        });
      })
      .catch((error) => {
        this.setState({
          showErrorMassage: true,
          displayData: false,
          errMss: error.message,
        });
      });
      await axios
      .get(
        `${process.env.REACT_APP_URL}/weather?city=${this.state.cityName}`
      )
      .then((response) => {
        this.setState({
          weatherData: response.data,
        });
      })
      .catch((error) => {
        // console.log('In Weather');
        this.setState({
          showErrorMassage: true,
          displayData: false,
          errMss: error.message,
        });
      });
    await axios
      .get(`${process.env.REACT_APP_URL}/movies?city=${this.state.cityName}`)
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          showError: true,
          errorMessage: error.message,
        });
      });
  };

  setShowerror = () => {
    this.setState({
      showErrorMassage: false,
    });
  };

  render() {
    return (
      <div>
        {this.state.showErrorMassage && <Alertm errMss={this.state.errMss} />}

        <Header />
        <Form getCitydata={this.getCitydata} updateCityName={this.updateCityName}/>
        <div>
          {this.state.displayData && <Map cityData={this.state.cityData} />}
        </div>
        {this.state.displayData && (
          <div>
            {this.state.weatherData.map((item) => (
              <Weather date={item.date} description={item.description} />
            ))}
          </div>
        )}
        <div>
          {this.state.displayData && (
            <div>
              {this.state.movies.map((item) => (
                <Movies
                  title={item.title}
                  overview={item.overview}
                  image_url={item.image_url}
                  released_on={item.released_on}
                  popularity={item.popularity}
                  average_votes={item.average_votes}
                  total_votes={item.total_votes}
                />
              ))}
            </div>
          )}
        </div>
        
        <footer><Footer /></footer>
      </div>
    )
  }
}

export default App
