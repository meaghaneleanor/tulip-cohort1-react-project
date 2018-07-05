import React, { Component } from 'react';
import { GoogleApiWrapper, Map, InfoWindow, Marker} from 'google-maps-react';

export class MapContainer extends Component {
  constructor() {
    super();

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    const mapStyle = {
      width: '100%',
      height: '50vh',
      margin: '0 auto'
    }
    return ( 
      <Map 
        google = {this.props.google}
        zoom = {10}
        initialCenter = {
          {
            lat: this.props.lat,
            lng: this.props.lng
            
          }
        }
        storeLocations = {this.props.inventory}
        style = {mapStyle}
        inventory = {this.props.storeLocations}
        onClick={this.onMapClicked} 
      >

        {this.props.storeLocations
          .map((store) => {
            return ( 
              <Marker 
                key = {store.id}
                position = {
                  {
                    lat: store.lat,
                    lng: store.long
                  }
                }
                name = {store.name}
                addressLineOne = {store.addressLineOne}
                onClick = {this.onMarkerClick}
                city = {store.city}
                postalCode = {store.postalCode}
                quantity = {store.quantity}
              />
            )
          })
        }

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
              <h3>{this.state.selectedPlace.addressLineOne}</h3>
              <h4>{this.state.selectedPlace.city}, {this.state.selectedPlace.postalCode}</h4>
              <p> Quantity Left: {this.state.selectedPlace.quantity}</p>
            </div>
        </InfoWindow>
      </Map> 

    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAHLUzB-tEbkZt9PgI0CKWu8AbjjBEW3CQ"
})(MapContainer)