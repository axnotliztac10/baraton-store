import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';


class CheckoutProduct extends React.PureComponent {
  render() {
    const { productData, productTotal, quantity } = this.props;

    return (
      <Card className="product">
        <div className="product-content">
          <div className="name">{productData.name}</div>
          <div className="price">Precio: <span>{productData.price}</span></div>
          <div className="checkout-quantity">Cantidad: {quantity}</div>
          <div className="total">Total: $ {productTotal}</div>
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

export default CheckoutProduct;
