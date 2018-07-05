import React from 'react';

export class BoozeList extends Component {
  renderData() {
    return this.props.products
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
}

export default BoozeList;
