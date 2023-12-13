import React from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaChartSimple } from "react-icons/fa6";
import { BiSolidSend } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import FormElement from "./FormElement";
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
      navigate: props.navigate,
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

  handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Wykonaj zapytanie HTTP do serwera
      const response = await axios.post("http://127.0.0.1:4000/ahp", {
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
      });
  
      // Parsuj odpowiedź
      const results = JSON.parse(response.data);
  
      // Zapisz wyniki w localStorage
      localStorage.setItem("results", JSON.stringify(results));
  
      // Zapisz uzupełnioną ankietę
      this.saveCompletedSurvey(results);
  
      // Stwórz obiekt JSON reprezentujący dane ankiety
      const surveyData = {
        surveyName: this.state.selectedSurvey.surveyName,
        criteria: this.state.selectedSurvey.criteria,
        variants: this.state.selectedSurvey.variants,
        results: results,
      };
  
      // Stwórz obiekt Blob
      const blob = new Blob([JSON.stringify(surveyData)], { type: "application/json" });
  
      // Stwórz adres URL do Blob
      const url = URL.createObjectURL(blob);
  
      // Stwórz element a
      const a = document.createElement("a");
      a.href = url;
      a.download = `${this.state.selectedSurvey.surveyName}_results.json`;
  
      // Dodaj element a do dokumentu i kliknij w niego
      document.body.appendChild(a);
      a.click();
  
      // Usuń element a z dokumentu
      document.body.removeChild(a);
  
      // Zwolnij zasoby używane przez Blob
      URL.revokeObjectURL(url);
  
      // Wyświetl komunikat o sukcesie
      toast.success("Wyniki zostały pomyślnie wysłane i pobrane!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    } catch (error) {
      console.error("Błąd podczas przetwarzania danych ankiety:", error);
    }
  };
  

  saveCompletedSurvey = (results) => {
    // Pobierz istniejące dane z pliku
    const completedSurveys = localStorage.getItem("completedsurveys")
      ? JSON.parse(localStorage.getItem("completedsurveys"))
      : [];

    // Dodaj nowe wyniki do listy
    completedSurveys.push(results);

    // Zapisz listę w pliku
    localStorage.setItem("completedsurveys", JSON.stringify(completedSurveys));
  };

  handleSurveySave(surveyName) {
    // Tutaj możesz dodać kod do zapisywania nowej ankiety w bazie danych lub innym miejscu
    // Następnie zaktualizuj availableSurveys
    this.setState((prevState) => ({
      availableSurveys: [...prevState.availableSurveys, surveyName],
    }));
  }

  combinations(n) {
    return (n * (n - 1)) / 2;
  }

  handleSurveySelect(surveyName) {
    const data = [
      ["criteria1AB", "criteria1BC", "criteria1AC"],
      ["criteria2AB", "criteria2BC", "criteria2AC"],
      ["criteria3AB", "criteria3BC", "criteria3AC"],
    ];
    this.state.availableSurveys.forEach((element) => {
      if (element.surveyName === surveyName) {
        for (let i = 0; i < element.criteria.length; i++) {
          console.log(this.combinations(element.variants.length));
          for (let j = 0; j < this.combinations(element.variants.length); j++) {
            this.state[data[i][j]] = "8";
            console.log(`${data[i][j]}: ${this.state[data[i][j]]}`);
          }
        }
        this.setState({
          selectedSurvey: element,
        });
      }
    });
    console.log(this.state);
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
          {this.state.selectedSurvey.criteria
            ? this.state.selectedSurvey.criteria.map((element) => {
                return (
                  <FormElement
                    key={element}
                    sliderId={this.state.selectedSurvey.criteria.indexOf(element) + 1}
                    criteriaName={element}
                    variantAName={this.state.selectedSurvey.variants[0]}
                    variantBName={this.state.selectedSurvey.variants[1]}
                    variantCName={this.state.selectedSurvey.variants[2]}
                    handleChange={this.handleChange}
                  />
                );
              })
            : ""}
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
