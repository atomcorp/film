import React from 'react';
import PropTypes from 'prop-types';
import css from './CollectionLayout.css';
import CollectionNameContainer from '@containers/CollectionNameContainer';
// import DraggableHandle from '@components/DraggableHandle/DraggableHandle';
import SplitPane from 'react-split-pane';
import './react-split-pane.css';
import localForage from 'localforage';
// this can be used by editable and no-editable things
const CollectionLayout = ({
  films,
  highlight,
  toggleWatched,
  sideBarWidth,
  search,
}) => (
  <div className={css.container}>
    <div className={css.header}>
      <h1 className={css.logo}>Your next</h1>
    </div>
    <div className={css.body}>
      <SplitPane
        split="vertical"
        minSize="300"
        defaultSize={sideBarWidth}
        onDragFinished={(size) => localForage.setItem('sidebarWidth', size)}
      >
        <div className={css.films}>
          {toggleWatched}
          {search}
          <CollectionNameContainer />
          {/* <button>Add more movies button</button> */}
          {films}
        </div>
        <div className={css.highlight}>{highlight}</div>
      </SplitPane>
    </div>
  </div>
);

CollectionLayout.propTypes = {
  films: PropTypes.element,
  highlight: PropTypes.element,
  toggleWatched: PropTypes.element,
  search: PropTypes.element,
  sideBarWidth: PropTypes.number,
};

export default CollectionLayout;
