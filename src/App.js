import React, {Fragment} from 'react';
import './App.css';

import Calculator from './components/calculator/Calculator';

export default () => {
  return (
    <Fragment>
      <h1>Calculator</h1>
      <Calculator/>
    </Fragment>
  );
}
