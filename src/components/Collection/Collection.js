import React from 'react';
import PropTypes from 'prop-types';
import {collectionStateType, userStateType} from '../../types';
import CollectionLayout from '@components/CollectionLayout/CollectionLayout';
import CollectionEditableListContainer from '@containers/CollectionEditableListContainer';
import CollectionStaticListContainer from '@containers/CollectionStaticListContainer';
import {Highlight} from '@containers';
import VisibilityContainer from '@containers/VisibilityContainer';
import localForage from 'localforage';

/**
 * This handles loading a Collection
 */
class Collection extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      sidebarWidth: 300,
      searchModalOpen: false,
    };
  }
  /**
   * componentDidMount
   */
  componentDidMount() {
    // TODO: improve this
    if (this.props.match.path.match('/c/:id')) {
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
    localForage.getItem('sidebarWidth', (err, value) => {
      this.setState({
        sidebarWidth: value,
      });
    });
  }
  handleSearchModal = (searchModalOpen) => {
    this.setState({
      searchModalOpen,
    });
  };
  /**
   * @return {HTML}
   */
  render() {
    return this.props.collection.id ? (
      <CollectionLayout
        films={
          this.props.editable ? (
            <CollectionEditableListContainer />
          ) : (
            <CollectionStaticListContainer />
          )
        }
        search={
          this.props.editable && (
            <button onClick={this.handleSearchModal}>Add film</button>
          )
        }
        highlight={<Highlight />}
        toggleWatched={this.props.editable && <VisibilityContainer />}
        sideBarWidth={this.state.sidebarWidth}
      />
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
  editable: PropTypes.bool,
};

export default Collection;
