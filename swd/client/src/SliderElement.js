//Form.js
import React from "react";
import "./App.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      variant1Name: props.variant1Name,
      variant2Name: props.variant2Name,
      handleChange: props.handleChange,
      elemId: props.elemId
    };
  }

  render() {
    return (
      <div>
        <label
          htmlFor={this.state.elemId}
          className="flex w-full justify-center block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          {this.state.variant1Name && this.state.variant2Name ? `${this.state.variant1Name} - ${this.state.variant2Name}` : ``}
        </label>
        <input
          id={this.state.elemId}
          name={this.state.elemId}
          type="range"
          min="0"
          max="16"
          defaultValue="8"
          onChange={this.state.handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
    );
  }
}

export default Form;
