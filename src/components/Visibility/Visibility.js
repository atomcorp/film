import React from 'react';
import PropTypes from 'prop-types';
import {COLLECTION_VISIBILITY} from '../../redux/actions/collection-actions';
import scss from './Visibility.css';

const Visibility = ({setCollectionVisibility, visibility}) => (
  <ul className={scss.visibility}>
    <li
      className={
        visibility === COLLECTION_VISIBILITY.SHOW_ALL ? scss.active : ''
      }
      onClick={() =>
        setCollectionVisibility({
          visibility: COLLECTION_VISIBILITY.SHOW_ALL,
        })
      }
    >
      All
    </li>
    <li
      className={
        visibility === COLLECTION_VISIBILITY.WATCHED ? scss.active : ''
      }
      onClick={() =>
        setCollectionVisibility({
          visibility: COLLECTION_VISIBILITY.WATCHED,
        })
      }
    >
      Watched
    </li>
    <li
      className={
        visibility === COLLECTION_VISIBILITY.UNWATCHED ? scss.active : ''
      }
      onClick={() =>
        setCollectionVisibility({
          visibility: COLLECTION_VISIBILITY.UNWATCHED,
        })
      }
    >
      Unwatched
    </li>
  </ul>
);

Visibility.propTypes = {
  setCollectionVisibility: PropTypes.func,
  visibility: PropTypes.string,
};

export default Visibility;
