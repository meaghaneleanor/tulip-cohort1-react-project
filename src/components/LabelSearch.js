import React, { Component } from 'react';

export class LabelSearch extends Component {
    render() {
        return(
            <div className="label-search-container">
                <label htmlFor="product-search-input">{this.props.labelTitle}</label>
                <input placeholder={this.props.stuff} onChange={this.props.updateFilter} id="product-search-input"/>
                <button onClick={this.props.updateAPI} className="search-button"> Search</button>
            </div>
        );
    }
}

export default LabelSearch;