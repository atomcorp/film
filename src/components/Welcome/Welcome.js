import React from 'react';
import Logo from './Logo';
import css from './Welcome.css';

const Welcome = () => (
  <div className={css.welcome}>
    <Logo className={css.logo} alt="Your next" />
    <h1>Curate your movie collection</h1>
  </div>
);

export default Welcome;

