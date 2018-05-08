import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

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
const Collection = ({films, watched, toggleWatchedList}) => (
  <DraggableList>
    <h2>Collection:</h2>
    <ol>
      <Droppable droppableId="collection" type="COLLECTION">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
            {...provided.droppableProps}
          >
            {films &&
              films.map((film, index) => (
              <Draggable key={index} draggableId={index} index={index}>
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
                      <i
                        onClick={() => {
                          toggleWatchedList({
                            imdbID: film.imdbID,
                          });
                        }}
                      >
                        {watched.includes(film.imdbID)
                          ? 'Remove from watched list'
                          : 'Add to watched list'}
                      </i>
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

/**
 * DraggableList using DnD
 */
class DraggableList extends Component {
  onDragStart = ({draggableId, type, source}) => {
    // const type = {
    //   draggableId: 'DraggableId',
    //   type: 'TypeId',
    //   source: 'DraggableLocation',
    // };
  };
  onDragUpdate = ({draggableId, type, source}) => {
    //
  };
  onDragEnd = (DragUpdate, DropReason) => {
    // the only one that is required
  };

  /** @return {HTML} */
  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        {this.props.children}
      </DragDropContext>
    );
  }
}

Collection.propTypes = {
  toggleWatchedList: PropTypes.func,
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
  watched: PropTypes.arrayOf(PropTypes.string),
};

export default Collection;
