import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { TiWeatherCloudy } from "react-icons/ti";
import { AiOutlineDollar } from "react-icons/ai";
import { LuPalmtree } from "react-icons/lu";
import Footer from "./Footer"; // Importuj komponent stopki


const results = JSON.parse(localStorage.getItem('results')) || {};

class Results extends React.Component {
  renderTableHeaders() {
    const results = JSON.parse(localStorage.getItem('results')) || {};
    const headers = Object.keys(results);

    return headers.map((header, index) => (
      <th key={index} className="border px-4 py-2">{header}</th>
    ));
  }

  renderTableRows() {
    const results = JSON.parse(localStorage.getItem('results')) || {};
    
    return Object.values(results).map((row, rowIndex) => (
      <tr key={rowIndex}>
        <td className="border px-4 py-2">{ rowIndex === 0 ? 'Cena' : rowIndex === 1 ? 'Atrakcje' : 'Pogoda' }</td>
        {row.map((cell, cellIndex) => (
          <td key={cellIndex} className="border px-4 py-2">{cell}</td>
        ))}
      </tr>
    ));
  }

  render() {
    return (
      <div className="container space-y-6">
        <h1 className="flex w-full justify-center rounded-md px-3 py-1.5 text-xl leading-6 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Wyniki
        </h1>
        {Object.keys(results).length > 0 ? (
          <div>
            <table className="border-collapse w-full mt-4">
              <thead>
                <tr>
                  <th className="border px-4 py-2"></th>
                  <th className="border px-4 py-2">Włochy</th>
                  <th className="border px-4 py-2">Szwajcaria</th>
                  <th className="border px-4 py-2">Hiszpania</th>
                </tr>
                {this.renderTableRows()}
              </thead>
            </table>
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
