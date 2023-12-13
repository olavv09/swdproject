//Form.js
import React from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaChartSimple } from "react-icons/fa6";
import { BiSolidSend } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer"; // Importuj komponent stopki
import FormElement from "./FormElement"
import SurveySelector from "./SurveySelector";
import { IoMdAddCircle } from "react-icons/io";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      criteria1AB: "",
      criteria1BC: "",
      criteria1AC: "",
      criteria2AB: "",
      criteria2BC: "",
      criteria2AC: "",
      criteria3AB: "",
      criteria3BC: "",
      criteria3AC: "",
      availableSurveys: [], // Lista dostępnych ankiet
      selectedSurvey: "",
      navigate: props.navigate
    };

    const fetchData = async () => {
      try {
        const response = await fetch(process.env.PUBLIC_URL + "/surveys.json");
        const surveyData = await response.json();
        this.state.availableSurveys = surveyData;
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    fetchData();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSurveySave = this.handleSurveySave.bind(this);
    this.handleSurveySelect = this.handleSurveySelect.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:4000/ahp", {
        criteria1AB: this.state.criteria1AB,
        criteria1BC: this.state.criteria1BC,
        criteria1AC: this.state.criteria1AC,
        criteria2AB: this.state.criteria2AB,
        criteria2BC: this.state.criteria2BC,
        criteria2AC: this.state.criteria2AC,
        criteria3AB: this.state.criteria3AB,
        criteria3BC: this.state.criteria3BC,
        criteria3AC: this.state.criteria3AC,
        criteriaCount: this.state.selectedSurvey.criteria.length,
        variantsCount: this.state.selectedSurvey.variants.length,
      })
      .then((response) => {
        const results = JSON.parse(response.data);
        console.log(this.state.criteria1AB);
        console.log(this.state.criteria1BC);
        console.log(this.state.criteria1AC);
        console.log(this.state.criteria2AB);
        console.log(this.state.criteria2BC);
        console.log(this.state.criteria2AC);
        console.log(this.state.criteria3AB);
        console.log(this.state.criteria3BC);
        console.log(this.state.criteria3AC);
        console.log(this.state.selectedSurvey.criteria.length);
        console.log(this.state.selectedSurvey.variants.length);
        console.log(results);
        localStorage.setItem("results", JSON.stringify(results));
        toast.success("Wyniki zostały pomyślnie wysłane!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSurveySave(surveyName) {
    // Tutaj możesz dodać kod do zapisywania nowej ankiety w bazie danych lub innym miejscu
    // Następnie zaktualizuj availableSurveys
    this.setState((prevState) => ({
      availableSurveys: [...prevState.availableSurveys, surveyName],
    }));
  }

  combinations(n) {
    return this.factorial(n)/(this.factorial(2)*this.factorial(n-2));
  }

  factorial(num) {
    var result = num;
    if (num === 0 || num === 1) 
      return 1; 
    while (num > 1) { 
      num--;
      result *= num;
    }
    return result;
  }

  handleSurveySelect(surveyName) {
    const data = [["criteria1AB", "criteria1BC", "criteria1AC"],
                  ["criteria2AB", "criteria2BC", "criteria2AC"],
                  ["criteria3AB", "criteria3BC", "criteria3AC"],]
    this.state.availableSurveys.forEach((element) => {
      if (element.surveyName === surveyName) {
        for(let i = 0; i < element.criteria.length; i++) {
          console.log(this.combinations(element.variants.length))
          for(let j = 0; j < this.combinations(element.variants.length); j++) {
            this.state[data[i][j]] = '8';
            console.log(`${data[i][j]}: ${this.state[data[i][j]]}`);
          }
        }
        this.setState({
          selectedSurvey: element,
        });
      }
    });
    console.log(this.state)
  }

  render() {
    return (
      <div className="container space-y-5">
        <ToastContainer />
        <h1 className="flex w-full justify-center rounded-md px-3 py-1.5 text-xl leading-6 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          {this.state.selectedSurvey.surveyName
            ? this.state.selectedSurvey.surveyName
            : "Ankieta"}
        </h1>
        <SurveySelector
          surveys={this.state.availableSurveys}
          onSelect={this.handleSurveySelect}
        />
        <form className="flex flex-col space-y-5 p-2" onSubmit={this.handleSubmit}>
          {this.state.selectedSurvey.criteria ? this.state.selectedSurvey.criteria.map((element) => {
            return <FormElement key={element} sliderId={this.state.selectedSurvey.criteria.indexOf(element)+1} criteriaName={element} variantAName={this.state.selectedSurvey.variants[0]} variantBName={this.state.selectedSurvey.variants[1]} variantCName={this.state.selectedSurvey.variants[2]} handleChange={this.handleChange} />
          }) : ""}
          <button
            type="submit"
            className="flex w-ful justify-center items-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Wyślij
            <BiSolidSend className="ml-1" />
          </button>
        </form>
        <Link to="/results">
            <button
              type="submit"
              className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 p-"
            >
              Sprawdź wyniki
              <FaChartSimple className="ml-1" />
            </button>
          </Link>
          <Link to="/create-survey">
            <button
              type="submit"
              className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Dodaj nową ankietę
              <IoMdAddCircle className="ml-1" />
            </button>
          </Link>

        <Footer />
      </div>
    );
  }
}

export default Form;
