import React from 'react';
import {SearchContainer, CollectionContainer} from '../../containers';
import scss from './FilmApp.module.scss';

const FilmApp = () => (
  <div className="film-app">
    {/* <h1 className={scss.title}>F I L M A P P</h1> */}
    <SearchContainer />
    <CollectionContainer />
  </div>
);

export {FilmApp};
