import React from 'react';
import Paper from '@material-ui/core/Paper';

import Product from './Product';
import ProductsFilters from './ProductsFilters';
import ProductsSorting from './ProductsSorting';

class ProductsGrid extends React.PureComponent {
  static defaultProps = {
    products: []
  };

  renderProduct = (product, key) => {
    return (
      <Product key={key} {...product} onSelected={this.props.onSelectProduct} />
    );
  }

  render() {
    const {
      products,
      selectedCategory,
      onSearch,
      onSort,
      currentSort,
    } = this.props;

    return (
      <React.Fragment>
        <h2>{selectedCategory.name ? selectedCategory.name : 'Primero selecciona una categoria.'}</h2>
        {products.length > 0 && <Paper className="filters-panel" elevation={1}>
          <ProductsFilters onSearch={onSearch} />
          <ProductsSorting onSort={onSort} currentSort={currentSort} />
        </Paper>}
        <div className="products-container">
          {products.map(this.renderProduct)}
        </div>
      </React.Fragment>
    );
  }
}

export default ProductsGrid;
