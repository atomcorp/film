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
      editing: false,
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
  toggleEditing = () => {
    this.setState((prevState) => ({
      editing: !prevState.editing,
    }));
  };
  /**
   * Render
   * @return {HTML}
   */
  render() {
    return (
      <div>
        {!this.state.editing ? (
          <h2>{this.state.name}</h2>
        ) : (
          <input value={this.state.name} onChange={this.handleChange} />
        )}
        {this.props.editable && (
          <div>
            <button onClick={this.toggleEditing}>Edit name</button>
            <button
              onClick={() =>
                this.props.setCollectionName({name: this.state.name})
              }
            >
              Save
            </button>
          </div>
        )}
      </div>
    );
  }
}

CollectionName.propTypes = {
  collection: PropTypes.object,
  setCollectionName: PropTypes.func,
  editable: PropTypes.bool,
};

export default CollectionName;
