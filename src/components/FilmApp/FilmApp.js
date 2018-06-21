import React from 'react';
import {
  Search,
  Collection,
  SearchResults,
  Visibility,
  Highlight,
} from '../../containers';
import css from './FilmApp.css';

const FilmApp = () => (
  <div className="film-app">
    {<h1 className={css.title}>Your Next</h1>}
    <Search />
    <SearchResults />
    <h2>Collection:</h2>
    <Visibility />
    <div className={css.content}>
      <div className={css.collection}>
        <Collection />
      </div>
      <div className={css.highlights}>
        <Highlight />
      </div>
    </div>
  </div>
);

export default FilmApp;
