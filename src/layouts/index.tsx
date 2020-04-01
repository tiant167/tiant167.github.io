import React, { FunctionComponent } from 'react';
import css from './index.less';
import Header from './Header';

const Layout: FunctionComponent = props => (
  <div className={css.App}>
    <Header />
    <div className={css.Body}>{props.children}</div>
  </div>
);

export default Layout;
