import React from 'react';

import Category from './Category';
import { StoreContext } from '../utils/contexts';


class CategoriesMenu extends React.PureComponent {
  static contextType = StoreContext;

  renderProducts = (category) => {
    const { products } = this.context;

    this.props.onSelectCategory(products.filter((product) => product.sublevel_id === category.id), category);
  }

  renderCategory = (category, key) => {
    const { selectedCategory } = this.props;

    return (
      <Category
        name={category.name}
        id={category.id}
        onSelected={!category.sublevels ? () => this.renderProducts(category) : undefined }
        key={key}
        isSelected={!category.sublevels && selectedCategory.id === category.id}
      >
        {category.sublevels && category.sublevels.map(this.renderCategory)}
      </Category>
    );
  }
  
  render() {
    return (
      <React.Fragment>
        <p>Categorias</p>
        <StoreContext.Consumer>
          {({ categories }) => categories.map(this.renderCategory)}
        </StoreContext.Consumer>
      </React.Fragment>
    );
  }
}

export default CategoriesMenu;
