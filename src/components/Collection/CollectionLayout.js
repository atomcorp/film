import React from 'react';
import PropTypes from 'prop-types';
import css from './CollectionLayout.css';
// this can be used by editable and no-editable things
const CollectionLayout = ({films, highlight}) => (
  <div className={css.container}>
    <div className={css.header}>This has logo</div>
    <div className={css.films}>
      <button>Add more movies button</button>
      {films}
    </div>
    <div className={css.highlight}>{highlight}</div>
  </div>
);

CollectionLayout.propTypes = {
  films: PropTypes.element,
  highlight: PropTypes.element,
};

export default CollectionLayout;
