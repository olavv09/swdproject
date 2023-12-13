import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SurveyForm.css"; // Import pliku z stylami
import { IoMdAddCircle } from "react-icons/io";
import { FaChartSimple } from "react-icons/fa6";
import { BiSolidSend } from "react-icons/bi";
import { MdModeEdit } from "react-icons/md";


const SurveyForm = () => {
  const [surveyName, setSurveyName] = useState("");
  const [criteria, setCriteria] = useState([]);
  const [variants, setVariants] = useState([]);
  const [savedSurveys, setSavedSurveys] = useState([]);

  useEffect(() => {
    // Load savedSurveys from the server on component mount
    fetchData();
  }, []); // Only run on mount

  const fetchData = async () => {
    try {
      const response = await fetch(process.env.PUBLIC_URL + "/surveys.json");
      const data = await response.json();
      setSavedSurveys(data);
    } catch (error) {
      console.error("Error fetching surveys:", error);
    }
  };

  const handleSave = async () => {
    // Create a JSON object representing the survey
    const surveyData = {
      surveyName: surveyName,
      criteria: criteria.map((c) => c.name),
      variants: variants.map((v) => v.name),
    };

    // Add the survey data to the array
    const updatedSurveys = [...savedSurveys, surveyData];
    setSavedSurveys(updatedSurveys);

    // Save to JSON file
    await saveToFile(updatedSurveys);

    // Clear the form after saving
    setSurveyName("");
    setCriteria([]);
    setVariants([]);
  };

  const saveToFile = async (data) => {
    try {
      const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "surveys.json";
      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error saving to file:", error);
    }
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
    <div className="survey-form space-y-5">
      <h1 className="flex w-full justify-center rounded-md px-3 py-1.5 text-xl leading-6 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Kreator ankiet
        </h1>
      <label className="form-label">Nazwa Ankiety:</label>
      <input
        className="form-input"
        type="text"
        value={surveyName}
        onChange={(e) => setSurveyName(e.target.value)}
      />

      <div className="form-section">
        <label className="form-label">Kryteria:</label>
        {criteria.map((c, index) => (
          <div key={index} className="form-field">
            <input
              className="form-input"
              type="text"
              value={c.name}
              onChange={(e) => handleCriteriaChange(index, e.target.value)}
            />
          </div>
        ))}
        <button className="flex w-full justify-center items-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" onClick={addCriteria}>Dodaj <IoMdAddCircle className="ml-1" /></button>
      </div>

      <div className="form-section">
        <label className="form-label">Warianty:</label>
        {variants.map((v, index) => (
          <div key={index} className="form-field">
            <input
              className="form-input"
              type="text"
              value={v.name}
              onChange={(e) => handleVariantChange(index, e.target.value)}
            />
          </div>
        ))}
        <button className="flex w-full justify-center items-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" onClick={addVariant}>Dodaj <IoMdAddCircle className="ml-1" /></button>
      </div>

      <button className="flex w-full justify-center items-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" onClick={handleSave}>Zapisz ankietę <BiSolidSend className="ml-1" /></button>

      {/* Display saved surveys */}
      {/*<div className="saved-surveys">
        <h2>Saved Surveys</h2>
        <ul>
          {savedSurveys.map((survey, index) => (
            <li key={index}>{JSON.stringify(survey)}</li>
          ))}
        </ul>
          </div>*/}
      <div>
        <Link to="/">
          <button className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Wypełnij ankietę <MdModeEdit className="ml-1"/>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SurveyForm;