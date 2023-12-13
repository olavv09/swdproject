import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import SurveySelector from "./SurveySelector";
import surveys from "./surveys.json";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSurvey: "",
      availableSurveys: surveys || [],
      loadedResults: {},
    };
  }

  calculateColor(value, minValue, maxValue) {
    const normalizedValue = (value - minValue) / (maxValue - minValue);
    const hue = 240 * normalizedValue; // Kierunek od czerwonego do zielonego
    const lightness = 50 - normalizedValue * 75; // Zwiększam szybkość zmiany jasności
    const alpha = 0.6;
    return `hsla(${hue}, 100%, ${lightness}%, ${alpha})`;
  }

  findMinAndMaxValues(results) {
    let allValues = [];
  
    Object.keys(results).forEach((criterion) => {
      allValues = allValues.concat(results[criterion]);
    });
  
    // Filtruj tylko liczby skończone
    const filteredValues = allValues.filter(value => typeof value === 'number' && isFinite(value));
  
    // Sprawdź, czy są jakiekolwiek liczby skończone
    if (filteredValues.length === 0) {
      // Brak liczb skończonych, ustaw domyślne wartości
      return { minValue: 0, maxValue: 1 };
    }
  
    const minValue = Math.min(...filteredValues);
    const maxValue = Math.max(...filteredValues);
  
    return { minValue, maxValue };
  }

  renderTableHeaders(results) {
    const variants = results.variants;

    return (
      <tr>
        {variants.map((variant, index) => (
          <th key={index} className="border px-4 py-2">
            {variant}
          </th>
        ))}
      </tr>
    );
  }

  renderTableRows(results) {
    const criteria = results.criteria;
    const { minValue, maxValue } = this.findMinAndMaxValues(results);
  
    return criteria.map((criterion, index) => {
      console.log('criterion:', criterion);
      console.log('results.results[index]:', results.results[index].criteriaWeights);
  
      return (
        <tr key={index}>
          <td className="border px-4 py-2">{criterion}</td>
          {results.results[index].criteriaWeights.map((cell, cellIndex) => {
            console.log('cell:', cell);
            console.log('minValue:', minValue);
            console.log('maxValue:', maxValue);
  
            return (
              <td
                key={cellIndex}
                className="border px-4 py-2"
                style={{
                  backgroundColor: this.calculateColor(cell, minValue, maxValue),
                  color: "black",
                }}
              >
                {cell}
              </td>
            );
          })}
        </tr>
      );
    });
  }
  

  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const loadedResults = JSON.parse(e.target.result);
          this.setState({ loadedResults });
          console.log(this.state.loadedResults)
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  render() {
    const { loadedResults, selectedSurvey } = this.state;
    const results = loadedResults || {};

    return (
      <div className="container space-y-6">
        <SurveySelector onSelect={(selectedSurvey) => this.setState({ selectedSurvey })} />
        <h1 className="flex w-full justify-center rounded-md px-3 py-1.5 text-xl leading-6 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Wyniki ankiety
        </h1>

        <div>
          <input
            type="file"
            accept=".json"
            onChange={this.handleFileChange}
            className="border rounded-md px-4 py-2"
          />
        </div>

        {selectedSurvey && (
          <div>
            <table className="border-collapse w-full mt-4">
              <thead>
                <tr>
                  <th className="border px-4 py-2"></th>
                  {this.renderTableHeaders(results)}
                </tr>
              </thead>
              <tbody>{this.renderTableRows(results)}
              Współczynnik konsekwetności: {results.results[0].cr}
              </tbody>
            </table>
          </div>
        )}

        <div>
          <Link to="/">
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Wróć do ankiety!
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Results;
