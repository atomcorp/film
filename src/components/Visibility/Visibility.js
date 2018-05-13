import React from 'react';
import PropTypes from 'prop-types';
import {COLLECTION_VISIBILITY} from '../../redux/actions/collection-actions';
import scss from './Visibility.module.scss';

const Visibility = ({setCollectionVisibility, visibility}) => (
  <ul>
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
      Show all
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
      Only show watched
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
      Only show unwatched
    </li>
  </ul>
);

Visibility.propTypes = {
  setCollectionVisibility: PropTypes.func,
  visibility: PropTypes.string,
};

export default Visibility;
