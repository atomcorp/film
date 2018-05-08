import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  setCollectionVisibility,
  COLLECTION_VISIBILITY,
} from '../../redux/actions/collection-actions';

const Visibility = ({setCollectionVisibility}) => (
  <ul>
    <li
      onClick={() =>
        setCollectionVisibility({
          visibility: COLLECTION_VISIBILITY.SHOW_ALL,
        })
      }
    >
      Show all
    </li>
    <li
      onClick={() =>
        setCollectionVisibility({
          visibility: COLLECTION_VISIBILITY.WATCHED,
        })
      }
    >
      Only show watched
    </li>
    <li
      onClick={() =>
        setCollectionVisibility({
          visibility: COLLECTION_VISIBILITY.UNWATCHED,
        })
      }
    >
      Only show unwatched
    </li>
  </ul>
);

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setCollectionVisibility: ({visibility}) => {
    dispatch(setCollectionVisibility({visibility}));
  },
});

Visibility.propTypes = {
  setCollectionVisibility: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Visibility);
