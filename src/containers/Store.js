import React from 'react';
import { sortBy } from 'lodash';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import CategoriesMenu from '../components/CategoriesMenu';
import ProductsGrid from '../components/ProductsGrid';
import Checkout from '../components/Checkout';
import { categories, products } from '../utils/data.json';
import { StoreContext } from '../utils/contexts';

export function getRawPrice(price) {
  return parseInt(price.replace('$','').replace(',', ''));
}

class Store extends React.PureComponent {
  state = {
    categoryProducts: [],
    selectedCategory: {},
    filteredProducts: [],
    currentSort: null,
    cartProducts: JSON.parse(localStorage.getItem('cartProducts')) || [],
    showCart: false,
    showMenu: true
  }

  onSelectCategory = (products, selectedCategory) => {
    this.setState({
      categoryProducts: products,
      filteredProducts: products,
      selectedCategory,
    });
  }

  handleOnSearch = (event, type) => {
    const { categoryProducts } =  this.state;
    const value = event.target.value;
    let filteredProducts;

    switch (type) {
      case 'name':
        if (value.length > 0) {
          filteredProducts = categoryProducts.filter((product) => product.name.includes(value))
        } else {
          filteredProducts = categoryProducts;
        }
      break;
      case 'priceMin':
        filteredProducts = categoryProducts.filter((product) => getRawPrice(product.price) > value)
      break;
      case 'priceMax':
        filteredProducts = categoryProducts.filter((product) => getRawPrice(product.price) < value)
      break;
      case 'quantity':
        filteredProducts = categoryProducts.filter((product) => product.quantity > value)
      break;
      default:
      break;
    }

    this.setState({
      filteredProducts,
    });
  }

  handleOnSort = (type, direction) => {
    const { filteredProducts } = this.state;
    let sortedProducts = null;

    switch (type) {
      case 'name':
        if (direction === 'asc') {
          sortedProducts = sortBy(filteredProducts, ['name']);
        } else {
          sortedProducts = sortBy(filteredProducts, ['name']).reverse();
        }
      break;
      case 'price':
        if (direction === 'asc') {
          sortedProducts = sortBy(filteredProducts, (product) => getRawPrice(product.price));
        } else {
          sortedProducts = sortBy(filteredProducts, (product) => getRawPrice(product.price)).reverse();
        }
      break;
      case 'quantity':
        if (direction === 'asc') {
          sortedProducts = sortBy(filteredProducts, ['quantity']);
        } else {
          sortedProducts = sortBy(filteredProducts, ['quantity']).reverse();
        }
      break;
      default:
      break;
    }

    this.setState({
      filteredProducts: sortedProducts,
      currentSort: type
    });
  }

  handleOnSelectProduct = (product) => {
    this.setState({
      cartProducts: [...this.state.cartProducts, product]
    });

    localStorage.setItem('cartProducts', JSON.stringify(this.state.cartProducts));
  }

  switchCart = () => {
    this.setState({ showCart: !this.state.showCart });
  }

  switchMobileMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  }

  render() {
    const {
      selectedCategory,
      filteredProducts,
      currentSort,
      cartProducts,
      showCart,
      showMenu
    } = this.state;

    return (
      <StoreContext.Provider
        value={{
          categories,
          products
        }}
      >
        <AppBar>
          <Toolbar>
            <IconButton
              onClick={this.switchMobileMenu}
              className="main-menu-mobile"
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Baraton Store
            </Typography>
            <Button onClick={this.switchCart} className="cart-button" color="inherit">Carrito {cartProducts.length}</Button>
          </Toolbar>
        </AppBar>
        <div className="store-container">
          {showMenu && <div className="main-menu">
            <CategoriesMenu
              onSelectCategory={this.onSelectCategory}
              selectedCategory={selectedCategory}
            />
          </div>}
          <div className="products-catalog">
            <ProductsGrid
              products={filteredProducts}
              selectedCategory={selectedCategory}
              currentSort={currentSort}
              onSearch={this.handleOnSearch}
              onSort={this.handleOnSort}
              onSelectProduct={this.handleOnSelectProduct}
            />
          </div>
          {showCart && <div className="checkout">
            <Checkout products={cartProducts} />
          </div>}
        </div>
      </StoreContext.Provider>
    );
  }
}

export default Store;
