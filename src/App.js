import React, { Component } from "react";

import { fetchLcboEndpoint } from "./api/lcbo.js";
import { LabelSearch} from "./components/LabelSearch";
import { BoozeList } from "./components/BoozeList";
import MapContainer from "./components/MapContainer";


import './styles/main.css';

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
      per_page: 10,
    //get product data and store in state array
    }).then(data => {
      this.setState({
        products: data.result,
      })
    });
  }

  findStoresWithInventory(e, product) {
    e.preventDefault();
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
        <BoozeList 
          id={product.id}
          img={product.image_thumb_url}
          name={product.name}
          package={product.package}
          buttonText="Find locations for this product"
          findStoresWithInventory={(e) => this.findStoresWithInventory(e, product)}
        />
      );
    });
  }

  render() {
    return (
      <div className="main-container">
        <LabelSearch 
          labelTitle="What product are you looking for?"
          updateFilter={this.updateFilter}
          updateAPI={this.updateAPI}
          stuff="Gin, Beer, Wine, etc..."
        />
        <div className="map-product-wrapper">
          <div className="product-list-container">
            {this.renderData()}
          </div>
          <div className="map-container">
            {this.state.lat && this.state.lng ?
              <MapContainer
                className="map"
                google={this.state.google} 
                storeLocations={this.state.inventory} 
                lat={this.state.lat} 
                lng={this.state.lng}/>
              : <p>Loading...</p>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
