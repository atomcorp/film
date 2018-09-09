import React from 'react';
import css from './SearchModal.css';
import {SearchInput, SearchResults} from '@containers';

const SearchModal = () => (
  <div className={css.container}>
    <h2 className={css.title}>Add a film</h2>
    <SearchInput />
    <SearchResults />
  </div>
);

export default SearchModal;
