import React from 'react';
import {Search, Collection, SearchResults, Visibility} from '../../containers';
// import scss from './FilmApp.module.scss';

const FilmApp = () => (
  <div className="film-app">
    {/* <h1 className={scss.title}>F I L M A P P</h1> */}
    <Search />
    <SearchResults />
    <Collection />
    <Visibility />
  </div>
);

export default FilmApp;
