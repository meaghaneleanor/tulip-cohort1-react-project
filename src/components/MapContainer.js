import React, { Component } from 'react';
import { GoogleApiWrapper, Map, InfoWindow, Marker} from 'google-maps-react';

const { REACT_APP_GOOGLE_API_KEY } = process.env;

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
    return ( 
      <Map 
        google = {this.props.google}
        zoom = {12}
        initialCenter = {
          {
            lat: this.props.lat,
            lng: this.props.lng
            
          }
        }
        storeLocations = {this.props.inventory}
        inventory = {this.props.storeLocations}
        onClick={this.onMapClicked}
        zoomControl={false}
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
                mapTypeControl={false}
              />
            )
          })
        }

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1 className="info-window-name">{this.state.selectedPlace.name}</h1>
              <h3 className="info-window-address">{this.state.selectedPlace.addressLineOne}</h3>
              <h4 className="info-window-city">{this.state.selectedPlace.city}, {this.state.selectedPlace.postalCode}</h4>
              <p className="info-window-quantity"><span> Quantity Left:</span> {this.state.selectedPlace.quantity}</p>
            </div>
        </InfoWindow>
      </Map> 

    );
  }
}

export default GoogleApiWrapper({
  apiKey: REACT_APP_GOOGLE_API_KEY
})(MapContainer)