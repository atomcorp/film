import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {DragDropContext} from 'react-beautiful-dnd';
import {
  reorderCollection,
  COLLECTION_VISIBILITY,
} from '../../redux/actions/collection-actions';
import filterCollection from '../../helpers/filterCollection';

/**
 * DraggableList using DnD
 */
class DraggableList extends Component {
  /**
   * Constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
  }
  /**
   * On Drag Start
   * @param {object} start
   * @param {string} start.draggableId
   * @param {string} start.TypeId
   * @param {object} start.source
   * @param {object} provided
   */
  onDragStart = (start, provided) => {
    /**
     * This hook is optional and therefore does not need to be provided.
     * It is highly recommended that you use this function to block
     * updates to all Draggable and Droppable components during a
     * drag. (See *Best practices for hooks *)
     */
    // console.log(start, provided);
  };
  onDragUpdate = ({draggableId, type, source}) => {
    //
  };
  /**
   * @param {object} DragUpdate
   * @param {object} DropReason
   */
  onDragEnd = (DragUpdate, DropReason) => {
    // get the real Index
    // get length of the current collection
    // this is the default
    if (
      DragUpdate.destination &&
      this.props.collection.visibility === COLLECTION_VISIBILITY.SHOW_ALL
    ) {
      this.props.reorderCollection({
        from: DragUpdate.source.index,
        to: DragUpdate.destination.index,
      });
    } else if (DragUpdate.destination) {
      // 1,2,3,4,5,6
      // 1,2, ,4, ,
      // 1, , ,4,2,
      // 1,3,4,2,5,6
      // We need to find out:
      // If the item gets move up, what index is it front of?
      // if the item has moved down, what index is it behind
      const realIndex = this.props.collection.films.findIndex(
        (film) => DragUpdate.draggableId === film.imdbID
      );
      const filteredCollection = filterCollection(this.props.collection);
      console.log(
        realIndex,
        DragUpdate.source.index,
        DragUpdate.destination.index
      );
      if (DragUpdate.source.index < DragUpdate.destination.index) {
        console.log('Down');
        const getRealIndexOfFilmInFront = this.props.collection.films.findIndex(
          (film) =>
            filteredCollection[DragUpdate.destination.index].imdbID === film.imdbID
        );
        console.log(getRealIndexOfFilmInFront);
        console.log('from: ', realIndex, 'to: ', getRealIndexOfFilmInFront);
      } else {
        console.log('Up');
        const getRealIndexOfFilmBehind = this.props.collection.films.findIndex(
          (film) =>
            filteredCollection[DragUpdate.destination.index].imdbID === film.imdbID
        );
        console.log(getRealIndexOfFilmBehind)
        console.log('from: ', realIndex, 'to: ', getRealIndexOfFilmBehind);
      }
    }
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

DraggableList.propTypes = {
  children: PropTypes.node,
  reorderCollection: PropTypes.func,
  collection: PropTypes.shape({
    films: PropTypes.array,
    visibility: PropTypes.shape(PropTypes.string),
  }),
};

const mapStateToProps = (state) => ({
  collection: state.collection,
});

const mapDispatchToProps = (dispatch) => ({
  reorderCollection: ({from, to}) => {
    dispatch(reorderCollection({from, to}));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DraggableList);
