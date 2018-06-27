import React from 'react';
import Logo from './Logo';
import css from './Welcome.css';

const Welcome = () => (
  <div className={css.welcome}>
    <Logo className={css.logo} />
  </div>
);

export default Welcome;

