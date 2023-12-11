//Form.js
import React from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { TiWeatherCloudy } from "react-icons/ti";
import { AiOutlineDollar } from "react-icons/ai";
import { LuPalmtree } from "react-icons/lu";
import { FaChartSimple } from "react-icons/fa6";
import { BiSolidSend } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer"; // Importuj komponent stopki
import SurveyForm from "./SurveyForm";
import SurveySelector from "./SurveySelector";

class Form extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      priceWS: '8',
      priceSH: '8',
      priceWH: '8',
      attractionsWS: '8',
      attractionsSH: '8',
      attractionsWH: '8',
      weatherWS: '8',
      weatherSH: '8',
      weatherWH: '8',
      availableSurveys: [], // Lista dostępnych ankiet
    };

    this.navigate = this.props.navigate; // Przekazuje navigate jako props z rodzica
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSurveySave(surveyName) {
    // Tutaj możesz dodać kod do zapisywania nowej ankiety w bazie danych lub innym miejscu
    // Następnie zaktualizuj availableSurveys
    this.setState((prevState) => ({
      availableSurveys: [...prevState.availableSurveys, surveyName],
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://127.0.0.1:4000/ahp', {
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
      .then((response) => {
        const results = JSON.parse(response.data);
        console.log(results);
        localStorage.setItem('results', JSON.stringify(results));
        toast.success("Wyniki zostały pomyślnie wysłane!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <ToastContainer />
        <form className="flex flex-col space-y-5" onSubmit={this.handleSubmit}>
          <div>
          <SurveySelector
            surveys={this.state.availableSurveys}
            onSelect={this.handleSurveySelect}
          />
            <h1 className="flex w-full justify-center rounded-md px-3 py-1.5 text-xl leading-6 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Ankieta</h1>
            <AiOutlineDollar />
            <span className="flex w-full justify-centerblock mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Cena
            </span>
            <label
              htmlFor="priceWS"
              className="flex w-full justify-center block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Szwajcaria - Włochy
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
              className="flex w-full justify-center block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Hiszpania - Szwajcaria
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
              className="flex w-full justify-center block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Hiszpania - Włochy
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
            <LuPalmtree />
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Atrakcje
            </span>
            <label
              htmlFor="attractionsWS"
              className="flex w-full justify-center block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Szwajcaria - Włochy
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
              className="flex w-full justify-center block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Hiszpania - Szwajcaria
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
              className="flex w-full justify-center block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Hiszpania - Włochy
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
            <TiWeatherCloudy />
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Pogoda
            </span>
            <label
              htmlFor="weatherWS"
              className="flex w-full justify-center block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Szwajcaria - Włochy
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
              className="flex w-full justify-center block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Hiszpania - Szwajcaria
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
              className="flex w-full justify-center block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Hiszpania - Włochy
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
            className="flex w-full justify-center items-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Wyślij
            <BiSolidSend className="ml-1" />
          </button>
          <Link to="/results">
            <button
              type="submit"
              className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sprawdź wyniki!
              <FaChartSimple className="ml-1" />
            </button>
          </Link>
        </form>
        
        <Footer />
      </div>
    );
  }
}

export default Form;
