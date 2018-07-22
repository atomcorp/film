import React from 'react';
import PropTypes from 'prop-types';
import {collectionStateType} from '../../types';
import {DraggableList} from '../../containers';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import scss from './Collection.css';
scss;
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
const CollectionList = ({
  collection,
  filteredCollection,
  toggleWatchedList,
  removeFilmFromCollection,
  toggleFilmRating,
  isDownloading,
  showHighlight,
  initNewCollection,
}) => (
  <DraggableList>
    <ol>
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
            {filteredCollection &&
              filteredCollection.map((film, index) => (
                <Draggable key={index} draggableId={film.imdbID} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <li onClick={() => showHighlight({imdbID: film.imdbID})}>
                        <h4>
                          {film.Title} ({film.Year})
                          {collection.watched.includes(film.imdbID) && ' ️👀'}
                          {collection.loved.includes(film.imdbID) && ' 💖'}
                        </h4>
                        {film.Director}
                        <br />
                        <button
                          onClick={() => {
                            toggleWatchedList({
                              imdbID: film.imdbID,
                            });
                          }}
                        >
                          {collection.watched.includes(film.imdbID)
                            ? 'Remove from watched list'
                            : 'Add to watched list'}
                        </button>
                        {collection.watched.includes(film.imdbID) && (
                          <React.Fragment>
                            <button
                              onClick={() =>
                                toggleFilmRating({
                                  imdbID: film.imdbID,
                                })
                              }
                            >
                              {collection.loved.includes(film.imdbID)
                                ? 'Unlove'
                                : 'Love'}
                            </button>
                          </React.Fragment>
                        )}
                        <br />
                        <button
                          onClick={() =>
                            removeFilmFromCollection({
                              imdbID: film.imdbID,
                            })
                          }
                        >
                          Delete
                        </button>
                      </li>
                    </div>
                  )}
                </Draggable>
              ))}
          </div>
        )}
      </Droppable>
    </ol>
  </DraggableList>
);

CollectionList.propTypes = {
  toggleWatchedList: PropTypes.func,
  removeFilmFromCollection: PropTypes.func,
  toggleFilmRating: PropTypes.func,
  filteredCollection: collectionStateType,
  watched: PropTypes.arrayOf(PropTypes.string),
  loved: PropTypes.arrayOf(PropTypes.string),
  isDownloading: PropTypes.bool,
  showHighlight: PropTypes.func,
  collection: collectionStateType,
  initNewCollection: PropTypes.func,
};

export default CollectionList;
