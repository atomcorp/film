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
      const filteredCollection = filterCollection(this.props.collection);
      // this basically just gets the film IDs from the filter
      // (the ID that was moved, and the ID it was move to)
      // and uses them to find the real index numbers
      this.props.reorderCollection({
        from: this.props.collection.films.findIndex(
          (film) => DragUpdate.draggableId === film.imdbID
        ),
        to: this.props.collection.films.findIndex(
          (film) =>
            filteredCollection[DragUpdate.destination.index].imdbID ===
            film.imdbID
        ),
      });
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
