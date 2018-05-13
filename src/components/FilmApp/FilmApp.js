import React from 'react';
import {Search, Collection, SearchResults, Visibility} from '../../containers';
import scss from './FilmApp.module.scss';

const FilmApp = () => (
  <div className="film-app">
    {<h1 className={scss.title}>Film App</h1>}
    <Search />
    <SearchResults />
    <Visibility />
    <Collection />
    </div>
);

export default FilmApp;
