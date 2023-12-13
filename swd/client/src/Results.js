// Results.js
import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import SurveySelector from "./SurveySelector";
import surveys from "./surveys.json";

class Results extends React.Component {
  calculateColorGradient(value, minValue, maxValue) {
    const normalizedValue = (value - minValue) / (maxValue - minValue);
    const hue = normalizedValue * 120;
    const lightness = 50 - normalizedValue * 25; // Jasność zmienia się od 50% do 75%
    const alpha = 0.3; // Poziom przezroczystości
    return `hsla(${hue}, 100%, ${lightness}%, ${alpha})`;
  }

  findMinAndMaxValues(results) {
    let allValues = [];

    Object.keys(results).forEach((criterion) => {
      allValues = allValues.concat(results[criterion]);
    });

    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);

    return { minValue, maxValue };
  }

  calculateConsistencyRatio(eigenvalue, matrixSize) {
    const randomIndexTable = [0, 0, 0.58, 0.90, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];
    const consistencyIndex = (eigenvalue - matrixSize) / (matrixSize - 1);
    const randomIndex = randomIndexTable[matrixSize - 1];
    const consistencyRatio = consistencyIndex / randomIndex;
    return consistencyRatio;
  }

  handleSurveySelect = (selectedSurvey) => {
    const selectedSurveyData = surveys.find((survey) => survey.surveyName === selectedSurvey);
    console.log("Selected Survey Data:", selectedSurveyData);

    // Przykładowe dane - do zastąpienia prawdziwymi danymi z ankiety
    const eigenvalue = 6; // Wartość własna
    const matrixSize = selectedSurveyData.criteria.length;

    // Oblicz współczynnik konsekwentności
    const consistencyRatio = this.calculateConsistencyRatio(eigenvalue, matrixSize);

    // Wnioski w zależności od współczynnika konsekwentności
    let consistencyConclusion;
    if (consistencyRatio <= 0.1) {
      consistencyConclusion = "Wyniki są akceptowalnie spójne.";
    } else {
      consistencyConclusion = "Wyniki nie są wystarczająco spójne. Spróbuj dostosować priorytety.";
    }

    console.log("Consistency Ratio:", consistencyRatio);
    console.log("Consistency Conclusion:", consistencyConclusion);
  };

  renderTableHeaders(results) {
    const headers = Object.keys(results);
    const survey = surveys.find((survey) => survey.surveyName === results.surveyName);

    return headers.map((header, index) => (
      <th key={index} className="border px-4 py-2">
        {survey ? survey.variants[index] : header}
      </th>
    ));
  }

  renderTableRows(results) {
    const criteria = Object.keys(results);
    const survey = surveys.find((survey) => survey.surveyName === results.surveyName);
    const { minValue, maxValue } = this.findMinAndMaxValues(results);

    return criteria.map((criterion, index) => {
      const cells = results[criterion];

      return (
        <tr key={index}>
          <td className="border px-4 py-2">
            {survey ? survey.criteria[index] : `Kryterium ${index + 1}`}
          </td>
          {cells.map((cell, cellIndex) => (
            <td
              key={cellIndex}
              className="border px-4 py-2"
              style={{
                backgroundColor: this.calculateColorGradient(
                  cell,
                  minValue,
                  maxValue
                ),
                color: "black",
              }}
            >
              {cell}
            </td>
          ))}
        </tr>
      );
    });
  }

  render() {
    const results = JSON.parse(localStorage.getItem("results")) || {};

    return (
      <div className="container space-y-6">
        <SurveySelector onSelect={this.handleSurveySelect} />
        <h1 className="flex w-full justify-center rounded-md px-3 py-1.5 text-xl leading-6 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Wyniki ankiety
        </h1>

        {Object.keys(results).length > 0 ? (
          <div>
            <table className="border-collapse w-full mt-4">
              <thead>
                <tr>
                  <th className="border px-4 py-2"></th>
                  {this.renderTableHeaders(results)}
                </tr>
              </thead>
              <tbody>{this.renderTableRows(results)}</tbody>
            </table>
            {/* Dodane wyświetlanie wniosków o spójności */}
            <div className="mt-4">
              <strong>Wnioski dotyczące spójności:</strong>
              <p>
                {this.calculateConsistencyRatio <= 0.1
                  ? "Wyniki są akceptowalnie spójne."
                  : "Wyniki nie są wystarczająco spójne. Spróbuj dostosować priorytety."}
              </p>
            </div>
          </div>
        ) : (
          <p>Brak wyników do wyświetlenia.</p>
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
