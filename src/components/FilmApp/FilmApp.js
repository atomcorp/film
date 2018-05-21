import React from 'react';
import {
  Search,
  Collection,
  SearchResults,
  Visibility,
  Highlight,
} from '../../containers';
import scss from './FilmApp.module.css';

const FilmApp = () => (
  <div className="film-app">
    {<h1 className={scss.title}>Film App</h1>}
    <Search />
    <SearchResults />
    <Highlight />
    <h2>Collection:</h2>
    <Visibility />
    <Collection />
  </div>
);

export default FilmApp;
