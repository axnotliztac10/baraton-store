import React from 'react';
import TextField from '@material-ui/core/TextField';

class ProductsFilters extends React.PureComponent {
  render() {
    const { searchValue } =  this.props;

    return (
      <React.Fragment>
        <div className="product-filters-label">Filtros: </div>
        <div className="product-filters">
            <TextField
            id="standard-name"
            label="Nombre"
            value={searchValue}
            onChange={(event) => this.props.onSearch(event, 'name')}
            margin="normal"
            />
            <div className="price-search">
            <TextField
                id="standard-name"
                label="Precio Minimo"
                value={searchValue}
                onChange={(event) => this.props.onSearch(event, 'priceMin')}
                placeholder="$1,000.00"
                margin="normal"
            />
            <TextField
                id="standard-name"
                label="Precio Maximo"
                value={searchValue}
                onChange={(event) => this.props.onSearch(event, 'priceMax')}
                placeholder="$5,000.00"
                margin="normal"
            />
            </div>
            <TextField
            id="standard-name"
            label="Cantidad minima"
            value={searchValue}
            onChange={(event) => this.props.onSearch(event, 'quantity')}
            placeholder="1000"
            margin="normal"
            />
        </div>
      </React.Fragment>
    );
  }
}

export default ProductsFilters;
