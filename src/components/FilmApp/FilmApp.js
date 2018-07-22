import React from 'react';
import {SearchInput, SearchResults, Highlight} from '../../containers';
import CollectionContainer from '../../containers/CollectionContainer';
import VisibilityContainer from '../../containers/VisibilityContainer';
import SignOutContainer from '../../containers/SignOutContainer';
import {Welcome} from '../';
import css from './FilmApp.css';

const FilmApp = () => (
  <div className="film-app">
    {<h1 className={css.title}>Your Next</h1>}
    <Welcome />
    <SearchInput />
    <SearchResults />
    <h2>Collection:</h2>
    <VisibilityContainer />
    <div className={css.content}>
      <div className={css.collection}>
        <CollectionContainer />
      </div>
      <div className={css.highlights}>
        <Highlight />
      </div>
    </div>
    <SignOutContainer />
  </div>
);

export default FilmApp;
