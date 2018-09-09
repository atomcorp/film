import React from 'react';
import PropTypes from 'prop-types';
import css from './CollectionName.css';
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
      originalName: this.props.collection.name,
    };
    this.inputRef = React.createRef();
  }
  /**
   * componentDidUpdate
   * @param {object} prevProps
   */
  componentDidUpdate(prevProps) {
    if (!prevProps.editing && this.state.editing) {
      this.inputRef.current.focus();
    }
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
      originalName: prevState.name,
    }));
  };
  saveName = () => {
    this.toggleEditing();
    this.props.setCollectionName({name: this.state.name});
  };
  reset = () => {
    this.setState((prevState) => ({
      editing: false,
      name: prevState.originalName,
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
          <h2 className={css.name}>
            {this.state.name}
            {this.props.editable && (
              <button onClick={this.toggleEditing}>✏️</button>
            )}
          </h2>
        ) : (
          <div className={css.editing}>
            <input
              ref={this.inputRef}
              className={css.input}
              value={this.state.name}
              onChange={this.handleChange}
            />
            {this.props.editable &&
              this.state.editing && (
                <span>
                  <button onClick={this.saveName}>💾</button>
                  <button onClick={this.reset}>🙅</button>
                </span>
              )}
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
