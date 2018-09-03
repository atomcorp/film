import React from 'react';
import PropTypes from 'prop-types';
import css from './CollectionLayout.css';
import CollectionNameContainer from '../../containers/CollectionNameContainer';

// this can be used by editable and no-editable things
const CollectionLayout = ({films, highlight, toggleWatched}) => (
  <div className={css.container}>
    <div className={css.films}>
      {toggleWatched}
      <CollectionNameContainer />
      <button>Add more movies button</button>
      {films}
    </div>
    <div className={css.highlight}>{highlight}</div>
  </div>
);

CollectionLayout.propTypes = {
  films: PropTypes.element,
  highlight: PropTypes.element,
  toggleWatched: PropTypes.element,
};

export default CollectionLayout;
