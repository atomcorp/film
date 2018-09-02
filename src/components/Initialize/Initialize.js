import React from 'react';
import PropTypes from 'prop-types';
import {authType, appStateType} from '../../types';
import css from './Initialize.css';

// TODO: maybe this should just be a loading modal

/**
 * Initialize, runs when booting up app
 * This should show for at most a second
 * @return {element}
 */
const Initialize = ({app, children}) => (
  <div className={css.container}>
    {app.isInitilisingApp && <div className={css.loading}>This is loading</div>}
    {children}
  </div>
);

Initialize.propTypes = {
  app: appStateType,
  auth: authType,
  initAppDone: PropTypes.func,
  children: PropTypes.element,
};

export default Initialize;
