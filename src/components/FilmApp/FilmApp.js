import React from 'react';
import {SearchInput, SearchResults} from '../../containers';
import CollectionContainer from '../../containers/CollectionContainer';
import SignOutContainer from '../../containers/SignOutContainer';
import {Welcome} from '../';
import css from './FilmApp.css';

const FilmApp = () => (
  <div className="film-app">
    {<h1 className={css.title}>Your Next</h1>}
    <Welcome />
    <SearchInput />
    <SearchResults />
    <CollectionContainer />
    <SignOutContainer />
  </div>
);

export default FilmApp;
