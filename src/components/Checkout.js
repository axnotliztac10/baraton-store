import React from 'react';
import { groupBy } from 'lodash';

import { getRawPrice } from '../containers/Store'
import CheckoutProduct from './CheckoutProduct';

class Checkout extends React.PureComponent {
  totalAmount = 0;
  state = {
    totalAmount: 0
  }

  renderProduct = (product) => {
    const quantity = product.length;
    const productData = product[0];
    const productTotal = getRawPrice(productData.price) * quantity;

    this.totalAmount += productTotal;

    return (
      <CheckoutProduct
        productData={product}
        productTotal={productTotal}
        quantity={quantity}
      />
    );
  }

  componentDidMount() {
    this.setState({
      totalAmount: this.totalAmount
    });
  }

  render() {
    const { products } = this.props;
    const groupedProducts = groupBy(products, 'name');
    const productsList = Object.keys(groupedProducts).map((product) => groupedProducts[product]);

    return (
      <div className="checkout-grid">
        {products.length > 0 && <div>Cuenta total: $ {this.state.totalAmount}</div>}
        {!products.length && <div className="no-products">Aun no hay productos en el carrito.</div>}
        {productsList.map(this.renderProduct)}
      </div>
    );
  }
}

export default Checkout;