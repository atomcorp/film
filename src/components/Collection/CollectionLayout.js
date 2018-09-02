import React from 'react';
import css from './Collection.css';
// this can be used by editable and no-editable things
const CollectionLayout = () => (
  <div className={css.container}>
    <div className={css.header}>This has logo</div>
    <div className={css.container}>
      <div>
        Scrollable List of movie name and maybe and <br />{' '}
        <button>Add more movies button</button>{' '}
      </div>
      <div>A highlighted movie with poster etc if clicked on list item</div>
    </div>
  </div>
);

export default CollectionLayout;
