// SurveySelector.js
import React, { useState, useEffect } from "react";

export const SurveySelector = ({ onSelect }) => {
  const [selectedSurvey, setSelectedSurvey] = useState("");
  const [localSurveys, setLocalSurveys] = useState([]);

  useEffect(() => {
    // Load surveys from local storage on component mount
    const storedSurveys = JSON.parse(localStorage.getItem("savedSurveys")) || [];
    setLocalSurveys(storedSurveys);
  }, []);

  const handleChange = (e) => {
    setSelectedSurvey(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <div>
      <label>Wybierz Ankietę:</label>
      <select value={selectedSurvey} onChange={handleChange}>
        <option value="" disabled>
          Wybierz ankietę
        </option>
        {localSurveys.map((survey, index) => (
          <option key={index} value={survey.surveyName}>
            {survey.surveyName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SurveySelector;
