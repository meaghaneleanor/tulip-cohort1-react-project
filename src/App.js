import React, { Component } from "react";

import { fetchLcboEndpoint } from "./api/lcbo.js";
import MapContainer from "./components/MapContainer"

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
      lat: "",
      lng: ""
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ 
          lat: position.coords.latitude, 
          lng: position.coords.longitude
        });
      }
    );
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
      let inventory = [];
      data.result.map((boozeItem) => {
        if (boozeItem.quantity !== 0 ) {
          return inventory = [
            ...inventory,
            {
              id: boozeItem.id, 
              quantity: boozeItem.quantity,
              lat: boozeItem.latitude,
              long: boozeItem.longitude,
              name: boozeItem.name,
              addressLineOne: boozeItem.address_line_1,
              city: boozeItem.city,
              postalCode: boozeItem.postal_code,
            }
          ]
        }
      })

      this.setState({
        inventory
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
        <button onClick={this.updateAPI}> Search</button>
        <div>
          {this.state.products.length > 0 ? <p>Choose your drink!</p> : null}
          <ul>
            {this.renderData()}
          </ul>
        </div>
        {this.state.lat && this.state.lng ?
          <MapContainer google={this.state.google} storeLocations={this.state.inventory} lat={this.state.lat} lng={this.state.lng}/>
          : <p>Loading...</p>
        }

      </div>
    );
  }
}

export default App;
