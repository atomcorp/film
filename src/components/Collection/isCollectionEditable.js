import React from 'react';
import PropTypes from 'prop-types';
import {getDisplayName} from '../../helpers/getDisplayName';

const isCollectionEditable = (WrappedComponent) => {
  /**
   * Check props and test if component is editable
   */
  class EditableCollection extends React.Component {
    /**
     * @return {ReactElement}
     */
    render() {
      return (
        <WrappedComponent
          {...this.props}
          editable={this.props.user.id === this.props.collection.admin}
        />
      );
    }
  }
  EditableCollection.displayName = `EditableCollection(${getDisplayName(
    WrappedComponent
  )})`;
  EditableCollection.propTypes = {
    user: PropTypes.object,
    collection: PropTypes.object,
  };
  return EditableCollection;
};

// const isCollectionEditable = (WrappedComponent) => WrappedComponent;

export default isCollectionEditable;
