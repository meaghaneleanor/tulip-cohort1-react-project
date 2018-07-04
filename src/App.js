import React, { Component } from "react";

import { fetchLcboEndpoint } from "./api/lcbo.js";

class App extends Component {
  constructor() {
    super();

    this.updateFilter = this.updateFilter.bind(this);
    this.updateAPI = this.updateAPI.bind(this);
    this.renderData = this.renderData.bind(this);
    this.findStoresWithInventory = this.findStoresWithInventory.bind(this);

    this.state = {
      products: [],
      filter: "",
      inventory: [],
    }
  }

  updateFilter(event) {
    this.setState({
      filter: event.target.value.toLowerCase(),
    })
  }

  updateAPI() {
    fetchLcboEndpoint("products", {
      q: this.state.filter,
    //get product data and store in state array
    }).then(data => {
      this.setState({
        products: data.result,
      })
    });
  }

  findStoresWithInventory(e, product) {
    fetchLcboEndpoint("stores", {
      product_id: product.id,
    }).then(data => {
      data.result.map((data) => {
        if (data.quantity !== 0) {
          console.log(data)
          this.setState({
            inventory: [ ...this.state.inventory,
              { 
                id: data.id, 
                quantity: data.quantity,
                lat: data.latitude,
                long: data.longitude,
              }
            ]
          });
        }
      })
    })
  }

  renderData() {
    return this.state.products
    .map((product) => {
      return (
        <a 
          onClick={((e) => this.findStoresWithInventory(e, product))} 
          key={product.id} 
          id={product.id}>
            <li>{product.name}<span>{product.package}</span></li>
        </a>
      );
    });
  }
 

  render() {
    return (
      <div>
        <label> Search for alcohol here!</label>
        <input placeholder="Search products here..." onChange={this.updateFilter}/>
        <button onClick={this.updateAPI}> Click me!</button>
        <ul>
          {this.renderData()}
        </ul>
      </div>
    );
  }
}

export default App;
