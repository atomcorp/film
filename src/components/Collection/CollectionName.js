import React from 'react';
import PropTypes from 'prop-types';

/**
 * Collection name, dispay and edit
 */
class CollectionName extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      name: this.props.collection.name,
    };
  }
  /**
   * handleChange
   * @param {event} event
   */
  handleChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  toggleEditable = () => {
    this.setState((prevState) => ({
      editable: !prevState.editable,
    }));
  };
  /**
   * Render
   * @return {HTML}
   */
  render() {
    return (
      <div>
        {!this.state.editable ? (
          <h2>{this.state.name}</h2>
        ) : (
          <input value={this.state.name} onChange={this.handleChange} />
        )}
        <button onClick={this.toggleEditable}>Edit name</button>
        <button
          onClick={() => this.props.setCollectionName({name: this.state.name})}
        >
          Save
        </button>
      </div>
    );
  }
}

CollectionName.propTypes = {
  collection: PropTypes.object,
  setCollectionName: PropTypes.func,
};

export default CollectionName;
