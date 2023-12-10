import React from "react";
import "./App.css";
import axios from "axios";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      priceWS: "8",
      priceSH: "8",
      priceWH: "8",
      attractionsWS: "8",
      attractionsSH: "8",
      attractionsWH: "8",
      weatherWS: "8",
      weatherSH: "8",
      weatherWH: "8",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:4000/ahp", {
        priceWS: this.state.priceWS,
        priceSH: this.state.priceSH,
        priceWH: this.state.priceWH,
        attractionsWS: this.state.attractionsWS,
        attractionsSH: this.state.attractionsSH,
        attractionsWH: this.state.attractionsWH,
        weatherWS: this.state.weatherWS,
        weatherSH: this.state.weatherSH,
        weatherWH: this.state.weatherWH,
      })
      .then(function (response) {
        return JSON.parse(response.data);
      })
      .then(function (json) {
        console.log(json);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <form className="flex flex-col space-y-10" onSubmit={this.handleSubmit}>
        <div>
          <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Cena
          </span>
          <label
            htmlFor="priceWS"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Włochy-Szwajcaria
          </label>
          <input
            id="priceWS"
            name="priceWS"
            type="range"
            min="0"
            max="16"
            defaultValue="8"
            onChange={this.handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />

          <label
            htmlFor="priceSH"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Szwajcaria-Hiszpania
          </label>
          <input
            id="priceSH"
            name="priceSH"
            type="range"
            min="0"
            max="16"
            defaultValue="8"
            onChange={this.handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />

          <label
            htmlFor="priceWH"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Włochy-Hiszpania
          </label>
          <input
            id="priceWH"
            name="priceWH"
            type="range"
            min="0"
            max="16"
            defaultValue="8"
            onChange={this.handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>

        <div>
          <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Atrakcje
          </span>
          <label
            htmlFor="attractionsWS"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Włochy-Szwajcaria
          </label>
          <input
            id="attractionsWS"
            name="attractionsWS"
            type="range"
            min="0"
            max="16"
            defaultValue="8"
            onChange={this.handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />

          <label
            htmlFor="attractionsSH"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Szwajcaria-Hiszpania
          </label>
          <input
            id="attractionsSH"
            name="attractionsSH"
            type="range"
            min="0"
            max="16"
            defaultValue="8"
            onChange={this.handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />

          <label
            htmlFor="attractionsWH"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Włochy-Hiszpania
          </label>
          <input
            id="attractionsWH"
            name="attractionsWH"
            type="range"
            min="0"
            max="16"
            defaultValue="8"
            onChange={this.handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>

        <div>
          <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Pogoda
          </span>
          <label
            htmlFor="weatherWS"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Włochy-Szwajcaria
          </label>
          <input
            id="weatherWS"
            name="weatherWS"
            type="range"
            min="0"
            max="16"
            defaultValue="8"
            onChange={this.handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />

          <label
            htmlFor="weatherSH"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Szwajcaria-Hiszpania
          </label>
          <input
            id="weatherSH"
            name="weatherSH"
            type="range"
            min="0"
            max="16"
            defaultValue="8"
            onChange={this.handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />

          <label
            htmlFor="weatherWH"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Włochy-Hiszpania
          </label>
          <input
            id="weatherWH"
            name="weatherWH"
            type="range"
            min="0"
            max="16"
            defaultValue="8"
            onChange={this.handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
        <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Ok
          </button>
      </form>
    );
  }
}

export default Form;
