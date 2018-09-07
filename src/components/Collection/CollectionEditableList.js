import React from 'react';
import PropTypes from 'prop-types';
import {collectionStateType} from '../../types';
import {DraggableList} from '../../containers';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import FilmInCollection from '../FilmInCollection/FilmInCollection';
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
  toggleWatchedList,
  removeFilmFromCollection,
  toggleFilmRating,
  isDownloading,
  showHighlight,
  toggleWatchedState,
}) => (
  <DraggableList>
    {isDownloading && 'Downloading...'}
    <Droppable droppableId="collection" type="COLLECTION">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={{
            backgroundColor: snapshot.isDraggingOver ? 'white' : 'white',
          }}
          {...provided.droppableProps}
        >
          {filteredFilms.map((film, index) => (
            <Draggable key={index} draggableId={film.imdbID} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <FilmInCollection
                    key={index}
                    showHighlight={showHighlight}
                    film={film}
                    collection={collection}
                    editable
                    toggleWatchedState={toggleWatchedState}
                    remove={
                      <div
                        onClick={() =>
                          removeFilmFromCollection({
                            imdbID: film.imdbID,
                          })
                        }
                      >
                        🗑️
                      </div>
                    }
                  />
                </div>
              )}
            </Draggable>
          ))}
        </div>
      )}
    </Droppable>
  </DraggableList>
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
  toggleWatchedState: PropTypes.func,
};

export default CollectionEditableList;
