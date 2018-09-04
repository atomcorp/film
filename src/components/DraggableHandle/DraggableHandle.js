import React from 'react';
import css from './DraggableHandle.css';

/** DraggableBar */
class DraggableBar extends React.Component {
  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.handle = React.createRef();
    this.state = {
      mouseDown: false,
    };
  }
  handleState = ({id, value}) => {
    this.setState({
      [id]: value,
    });
  };
  handleMouseDown = (e) => {
    const target = e.currentTarget;
    const currentOffset = target.offsetLeft;
    const currentWindowWidth = window.innerWidth;
    this.handleState({id: 'mouseDown', value: true});
    console.log(target);
    // get the position of this in the window
    // ge the position of the mouse
    // run a loop to check again
  };
  handleMouseUp = (e) => {
    this.handleState({id: 'mouseDown', value: false});
  };
  handleMouseMove = (e) => {
    console.log(e.pageX);
  };
  /**
   * @return {element}
   */
  render() {
    return (
      <div
        ref={this.handle}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        className={css.bar}
      />
    );
  }
}

export default DraggableBar;
