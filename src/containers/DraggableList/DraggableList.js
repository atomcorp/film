import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {DragDropContext} from 'react-beautiful-dnd';
import {reorderCollection} from '../../redux/actions/collection-actions';

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
    if (DragUpdate.destination) {
      this.props.reorderCollection({
        from: DragUpdate.source.index,
        to: DragUpdate.destination.index,
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
  films: PropTypes.array,
};

const mapStateToProps = (state) => ({
  films: state.collection.films,
});

const mapDispatchToProps = (dispatch) => ({
  reorderCollection: ({from, to}) => {
    dispatch(reorderCollection({from, to}));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DraggableList);
