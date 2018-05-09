import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {DragDropContext} from 'react-beautiful-dnd';
import {reorderCollection} from '../../redux/actions/collection-actions';

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
  /**
  * This hook is optional and therefore does not need to be provided.
  * It is highly recommended that you use this function to block
  * updates to all Draggable and Droppable components during a
  * drag. (See *Best practices for hooks *)
  */
                                                 };
  onDragUpdate = ({draggableId, type, source}) => {
    //
  };
  /**
   * @param {object} DragUpdate
   * @param {object} DropReason
   */
  onDragEnd = (DragUpdate, DropReason) => {
    // the only one that is required
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
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  reorderCollection: ({from, to}) => {
    dispatch(reorderCollection({from, to}));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DraggableList);
