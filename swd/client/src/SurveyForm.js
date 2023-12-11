import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SurveyForm = ({ onSave }) => {
  const [surveyName, setSurveyName] = useState("");
  const [criteria, setCriteria] = useState([]);
  const [variants, setVariants] = useState([]);
  const [savedSurveys, setSavedSurveys] = useState([]);

  useEffect(() => {
    // Load savedSurveys from local storage on component mount
    const storedSurveys = JSON.parse(localStorage.getItem("savedSurveys")) || [];
    setSavedSurveys(storedSurveys);
  }, []);

  const handleSave = () => {
    // Create a JSON object representing the survey
    const surveyData = {
      surveyName: surveyName,
      criteria: criteria.map((c) => c.name),
      variants: variants.map((v) => v.name),
    };

    // Add the survey data to the array
    setSavedSurveys([...savedSurveys, surveyData]);
    console.log("Loaded Surveys from localStorage:", surveyData);
    localStorage.setItem("surveyData", JSON.stringify(surveyData));
    

    // Clear the form after saving
    setSurveyName("");
    setCriteria([]);
    setVariants([]);
  };

  const addCriteria = () => {
    setCriteria([...criteria, { name: "" }]);
  };

  const addVariant = () => {
    setVariants([...variants, { name: "" }]);
  };

  const handleCriteriaChange = (index, value) => {
    const updatedCriteria = [...criteria];
    updatedCriteria[index] = { name: value };
    setCriteria(updatedCriteria);
  };

  const handleVariantChange = (index, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = { name: value };
    setVariants(updatedVariants);
  };

  return (
    <div>
      <label>Nazwa Ankiety:</label>
      <input
        type="text"
        value={surveyName}
        onChange={(e) => setSurveyName(e.target.value)}
      />

      <div>
        <label>Kryteria:</label>
        {criteria.map((c, index) => (
          <div key={index}>
            <input
              type="text"
              value={c.name}
              onChange={(e) => handleCriteriaChange(index, e.target.value)}
            />
          </div>
        ))}
        <button onClick={addCriteria}>Dodaj Kryterium</button>
      </div>

      <div>
        <label>Warianty:</label>
        {variants.map((v, index) => (
          <div key={index}>
            <input
              type="text"
              value={v.name}
              onChange={(e) => handleVariantChange(index, e.target.value)}
            />
          </div>
        ))}
        <button onClick={addVariant}>Dodaj Wariant</button>
      </div>

      <button onClick={handleSave}>Zapisz Ankietę</button>

      {/* Display saved surveys */}
      <div>
        <h2>Saved Surveys</h2>
        <ul>
          {savedSurveys.map((survey, index) => (
            <li key={index}>{JSON.stringify(survey)}</li>
          ))}
        </ul>
      </div>
      <Link to="/">
    
          <button
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Przejdź do ankiet
          </button>
        </Link>
    </div>
  );
};

export default SurveyForm;

// dodac ahp, który policzy wagi z kryteriow nie wariantow
// kilka wypelnionych instancji (ankiet)
// zagregowac dane
// srednia wazona, mediana, wykres
// podbicie wspolczynnika konsekwentnosci