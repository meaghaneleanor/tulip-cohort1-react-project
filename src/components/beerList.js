import React from 'react';

const BeerList = ({products}) => {
    return this.props.products
    .map((product) => {
      return (
        <a href=""><li id={product.id} key={product.id}>{product.name}</li></a>
      );
    })
}

export default BeerList;