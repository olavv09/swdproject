// CreateSurvey.js
import React, { useState, useCallback } from "react";
import SurveyForm from "./SurveyForm";
import Footer from "./Footer";

const CreateSurvey = ({ onSave }) => {
  return (
    <div className="container">
      <SurveyForm />
      <Footer />
    </div>
  );
};

export default CreateSurvey;
