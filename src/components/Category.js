import React from 'react';
import Button from '@material-ui/core/Button';


class Category extends React.PureComponent {
  state = {
    showing: false
  }

  handleOnClick = () => {
    if (this.props.onSelected) {
      return this.props.onSelected();
    }

    this.setState({
      showing: !this.state.showing
    });
  }

  render() {
    const { name, id, children, isSelected } = this.props;
    const { showing } = this.state;

    return (
      <React.Fragment>
        <Button
          color={isSelected ? 'secondary' : 'primary'}
          onClick={this.handleOnClick}
          value={id}
        >
          {name}
        </Button>
        {
          showing && <div className="category-content">{children}</div>
        }
      </React.Fragment>
    );
  }
}

export default Category;
