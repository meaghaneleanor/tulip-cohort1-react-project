import React, { Component } from 'react';

export class BoozeList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="product-item" key={this.props.id}>
            <div class="product-item-image">
              <img src={this.props.img} alt={this.props.name}/>
            </div>
            <div className="product-item-info">
              <p className="product-item-name">{this.props.name}</p>
              <p className="product-item-package">{this.props.package}</p>
              <button className="product-item-button" onClick={this.props.findStoresWithInventory}>{this.props.buttonText}</button>
            </div>
        </div>
    )
  }
}

export default BoozeList;
