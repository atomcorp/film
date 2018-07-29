import React from 'react';
import PropTypes from 'prop-types';
import {collectionStateType, userStateType} from '../../types';
import CollectionListContainer from '../../containers/CollectionListContainer';
import CollectionNameContainer from '../../containers/CollectionNameContainer';
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
    // TODO: abstract this check elsewhere
    if (!this.props.user.collections.length) {
      this.props.initNewCollection({
        usersId: this.props.user.id,
        usersName: this.props.user.name,
      });
    } else {
      // download collection
      this.props.getCollectionData({id: this.props.user.collections[0]});
    }
  }
  /**
   * @return {HTML}
   */
  render() {
    return this.props.collection.id ? (
      <div>
        <CollectionNameContainer />
        <CollectionListContainer />
      </div>
    ) : (
      <div>Creating you a new collection</div>
    );
  }
}

Collection.propTypes = {
  collection: collectionStateType,
  initNewCollection: PropTypes.func,
  user: userStateType,
  getCollectionData: PropTypes.func,
};

export default Collection;
