import PropTypes from 'prop-types';
import React from 'react';
import FilmInCollection from '@components/Collection/FilmInCollection';
import {collectionStateType} from '../../types';
// // import css from './Collection.css';
/**
 * @typedef film
 * Full film data from omdbAPI
 * @property {string} Director
 * @property {string} imdbID
 * @property {string} Year
 * @property {string} Genre - comma separated
 * @property {string} Writer
 * @property {string} Actors - comma separated
 * @property {string} Plot
 * @property {string} Language - comma separated
 * @property {string} Country - comma separated
 * @property {string} Awards
 * @property {string} Poster
 * @property {object} Ratings
 * @property {string} Ratings.Source
 * @property {string} Ratings.Value
 * @property {string} Production
 * @property {string} Website
 */

/**
 * List the films in the collection
 * @param {object} collection
 * @param {Array<film>} collection.film
 * @return {HTML}
 */
const CollectionEditableList = ({
  collection,
  filteredFilms,
  isDownloading,
  showHighlight,
}) => (
  <div>
    {isDownloading && 'Downloading...'}
    {filteredFilms.map((film, index) => (
      <FilmInCollection
        key={index}
        showHighlight={showHighlight}
        film={film}
        collection={collection}
      />
    ))}
  </div>
);

CollectionEditableList.propTypes = {
  toggleWatchedList: PropTypes.func,
  removeFilmFromCollection: PropTypes.func,
  toggleFilmRating: PropTypes.func,
  filteredFilms: PropTypes.arrayOf(PropTypes.object),
  watched: PropTypes.arrayOf(PropTypes.string),
  loved: PropTypes.arrayOf(PropTypes.string),
  isDownloading: PropTypes.bool,
  showHighlight: PropTypes.func,
  collection: collectionStateType,
  initNewCollection: PropTypes.func,
};

export default CollectionEditableList;
