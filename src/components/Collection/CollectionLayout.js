import React from 'react';
import PropTypes from 'prop-types';
import css from './CollectionLayout.css';
import CollectionNameContainer from '../../containers/CollectionNameContainer';
// import DraggableHandle from '@components/DraggableHandle/DraggableHandle';
import SplitPane from 'react-split-pane';
import './react-split-pane.css';
// this can be used by editable and no-editable things
const CollectionLayout = ({films, highlight, toggleWatched}) => (
  <div className={css.container}>
    <SplitPane split="vertical" minSize="25%" maxSize="50%">
      <div className={css.films}>
        {toggleWatched}
        <CollectionNameContainer />
        <button>Add more movies button</button>
        {films}
      </div>
      <div className={css.highlight}>{highlight}</div>
    </SplitPane>
  </div>
);

CollectionLayout.propTypes = {
  films: PropTypes.element,
  highlight: PropTypes.element,
  toggleWatched: PropTypes.element,
};

export default CollectionLayout;
