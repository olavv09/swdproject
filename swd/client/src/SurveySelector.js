import React, { useState, useEffect } from "react";

const SurveySelector = ({ onSelect }) => {
  const [selectedSurvey, setSelectedSurvey] = useState("");
  const [localSurveys, setLocalSurveys] = useState([]);

  useEffect(() => {
    // Load surveys from surveys.json on component mount
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.PUBLIC_URL + "/surveys.json");
        const surveyData = await response.json();
        setLocalSurveys(surveyData);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const selectedSurvey = e.target.value;
    setSelectedSurvey(selectedSurvey);

    // Call onSelect function if it's a function
    if (typeof onSelect === "function") {
      onSelect(selectedSurvey);
    }
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
