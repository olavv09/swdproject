import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      priceWS: 0,
      priceSH: 0,
      priceWH: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    console.log("dupa");
    event.preventDefault();
    axios.post('http://127.0.0.1:4000/ahp', {
      priceWS: this.state.priceWS,
      priceSH: this.state.priceSH,
      priceWH: this.state.priceWH
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
  return (
    <div className="App flex flex-col space-y-10">
      <form className="space-y-6" onSubmit={this.handleSubmit}>
      <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cena</span>
      <label for="priceWS" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Włochy-Szwajcaria</label>
      <input id="priceWS" type="range" min="0" max="10" defaultValue="5" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />

      <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Szwajcaria-Hiszpania</label>
      <input id="minmax-range" type="range" min="0" max="10" defaultValue="5" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />

      <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Włochy-Hiszpania</label>
      <input id="minmax-range" type="range" min="0" max="10" defaultValue="5" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
      <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Ok
            </button>
      </form>

      <div>
      <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Atrakcje</span>
      <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Włochy-Szwajcaria</label>
      <input id="minmax-range" type="range" min="0" max="10" defaultValue="5" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />

      <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Szwajcaria-Hiszpania</label>
      <input id="minmax-range" type="range" min="0" max="10" defaultValue="5" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />

      <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Włochy-Hiszpania</label>
      <input id="minmax-range" type="range" min="0" max="10" defaultValue="5" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
      </div>

      <div>
      <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pogoda</span>
      <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Włochy-Szwajcaria</label>
      <input id="minmax-range" type="range" min="0" max="10" defaultValue="5" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />

      <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Szwajcaria-Hiszpania</label>
      <input id="minmax-range" type="range" min="0" max="10" defaultValue="5" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />

      <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Włochy-Hiszpania</label>
      <input id="minmax-range" type="range" min="0" max="10" defaultValue="5" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
      </div>
    </div>
  );
};
}

export default App;