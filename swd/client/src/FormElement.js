//Form.js
import React from "react";
import "./App.css";
import SliderElement from "./SliderElement"

class FormElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      criteriaName: props.criteriaName,
      variantAName: props.variantAName,
      variantBName: props.variantBName,
      variantCName: props.variantCName,
      handleChange: props.handleChange,
      sliderId: props.sliderId,
    };
  }

  render() {
    return (
      <div>
        <span className="flex w-full justify-centerblock mb-2 text-sm font-medium text-gray-900 dark:text-black">
          {this.state.criteriaName}
        </span>
        {this.state.variantBName && this.state.variantAName ? <SliderElement elemId={`criteria${this.state.sliderId}AB`} variant1Name={this.state.variantBName} variant2Name={this.state.variantAName} handleChange={this.state.handleChange}/> : ""}
        {this.state.variantCName && this.state.variantBName ? <SliderElement elemId={`criteria${this.state.sliderId}BC`} variant1Name={this.state.variantCName} variant2Name={this.state.variantBName} handleChange={this.state.handleChange}/> : ""}
        {this.state.variantCName && this.state.variantAName ? <SliderElement elemId={`criteria${this.state.sliderId}AC`} variant1Name={this.state.variantCName} variant2Name={this.state.variantAName} handleChange={this.state.handleChange}/> : ""}
      </div>
    );
  }
}

export default FormElement;
