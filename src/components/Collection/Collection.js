import React from 'react';
import PropTypes from 'prop-types';
import {DraggableList} from '../../containers';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import scss from './Collection.module.scss';
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
const Collection = ({
  films,
  watched,
  toggleWatchedList,
  allFilms,
  removeFilmFromCollection,
}) => (
  <DraggableList>
    <ol>
      <Droppable droppableId="collection" type="COLLECTION">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              backgroundColor: snapshot.isDraggingOver ? 'white' : 'white',
            }}
            {...provided.droppableProps}
          >
            {films &&
              films.map((film, index) => (
                <Draggable key={index} draggableId={film.imdbID} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <li>
                        <h4>
                          {film.Title} ({film.Year})
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
                          {watched.includes(film.imdbID)
                            ? 'Remove from watched list'
                            : 'Add to watched list'}
                        </button>
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

Collection.propTypes = {
  toggleWatchedList: PropTypes.func,
  removeFilmFromCollection: PropTypes.func,
  films: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string,
      Director: PropTypes.string,
      imdbID: PropTypes.string,
      Year: PropTypes.string,
      Genre: PropTypes.string,
      Writer: PropTypes.string,
      Actors: PropTypes.string,
      Plot: PropTypes.string,
      Language: PropTypes.string,
      Country: PropTypes.string,
      Awards: PropTypes.string,
      Poster: PropTypes.string,
      Ratings: PropTypes.arrayOf(
        PropTypes.shape({
          Source: PropTypes.string,
          Value: PropTypes.string,
        })
      ),
      Production: PropTypes.string,
      Website: PropTypes.string,
    })
  ),
  allFilms: PropTypes.arrayOf(PropTypes.object),
  watched: PropTypes.arrayOf(PropTypes.string),
};

export default Collection;
