import React from 'react';
import PropTypes from 'prop-types';
import {collectionStateType, userStateType} from '../../types';
import CollectionListContainer from '../../containers/CollectionListContainer';
/**
 * This handles loading a Collection
 */
class Collection extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
  }
  /**
   * componentDidMount
   */
  componentDidMount() {
    if (this.props.collection.id === null) {
      this.props.initNewCollection({
        usersId: this.props.user.id,
        usersName: this.props.user.name,
      });
    }
  }
  /**
   * @return {HTML}
   */
  render() {
    return this.props.collection.id ? (
      <CollectionListContainer />
    ) : (
      <div>Creating you a new collection</div>
    );
  }
}

Collection.propTypes = {
  collection: collectionStateType,
  initNewCollection: PropTypes.func,
  user: userStateType,
};

export default Collection;
