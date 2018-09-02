import React from 'react';
import PropTypes from 'prop-types';
import {collectionStateType, userStateType} from '../../types';
import CollectionListContainer from '../../containers/CollectionListContainer';
import CollectionNameContainer from '../../containers/CollectionNameContainer';
import {Highlight} from '../../containers';
import css from './Collection.css';
import VisibilityContainer from '../../containers/VisibilityContainer';

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
    // TODO: improve this
    if (this.props.match) {
      // eg. /c/:collectionId
      this.props.getCollectionData({id: this.props.match.params.id});
    } else {
      // eg. /app and user has no collection
      if (!this.props.user.collections.length) {
        this.props.initNewCollection({
          usersId: this.props.user.id,
          usersName: this.props.user.name,
        });
      } else {
        // /app and user has collection
        this.props.getCollectionData({id: this.props.user.collections[0]});
      }
    }
  }
  /**
   * @return {HTML}
   */
  render() {
    return this.props.collection.id ? (
      <div>
        <h2>Collection:</h2>
        <VisibilityContainer />
        <div className={css.content}>
          <div className={css.collection}>
            <div>
              <CollectionNameContainer />
              <CollectionListContainer />
            </div>
          </div>
          <div className={css.highlights}>
            <Highlight />
          </div>
        </div>
      </div>
    ) : (
      <div>Loading you collection</div>
    );
  }
}

Collection.propTypes = {
  collection: collectionStateType,
  initNewCollection: PropTypes.func,
  user: userStateType,
  getCollectionData: PropTypes.func,
  match: PropTypes.object,
};

export default Collection;
