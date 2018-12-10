import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

class Product extends React.PureComponent {
  render() {
    const { name, available, quantity, price, onSelected } = this.props;

    return (
      <Card className="product">
        <div className="product-content">
          <div className="name">{name}</div>
          {!available && <div className="not-available">No Disponible</div>}
          {available && <div className="available">Disponibles: {quantity}</div>}
          <div className="price">Precio: <span>{price}</span></div>
          <Button color="primary" disabled={!available} onClick={() => onSelected(this.props)}>Agregar</Button>
        </div>
        <CardMedia
          className="product-image"
          image="https://pm1.narvii.com/6518/0690240f01ad63f01fb7f6f27477b56ab033f764_hq.jpg"
          title="Live from space album cover"
        />
      </Card>
    );
  }
}

export default Product;
