import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './styles.module.scss';

const Spinner = () => (
  <div className={styles.spinner}>
    <CircularProgress
      size="5em"
      style={{ color: "darkgray" }}
    />
  </div>
);

export default Spinner;