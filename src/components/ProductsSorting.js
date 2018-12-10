import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const sortTypes = [ 'name', 'price', 'quantity']; 


class ProductsSorting extends React.PureComponent {
  state = {
    direction: 'asc'
  }

  handleOnSort = (type) => {
    const { onSort } = this.props;
    const newDirection = this.state.direction === 'asc' ? 'desc' : 'asc';

    this.setState({
      direction: newDirection
    });

    onSort(type, newDirection);
  }

  render() {
    const { direction } = this.state;
    const { currentSort } = this.props;

    return (
      <React.Fragment>
        <div className="product-sorting-container">
          <div>Ordenar por: </div>
          {sortTypes.map((type, key) => (
            <Button variant="outlined" key={key} onClick={() => this.handleOnSort(type)}>
              {type}
              {currentSort === type && direction === 'asc' && <Icon>arrow_drop_up</Icon>}
              {currentSort === type && direction === 'desc' && <Icon>arrow_drop_down</Icon>}
            </Button>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default ProductsSorting;
