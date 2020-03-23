import React from 'react';
import Header from './Header';
import css from '../App.module.less';

const Layout: React.FunctionComponent = (props) => {
  return (
    <div className={css.App}>
      <Header />
      <div className={css.Body}>
        { props.children }
      </div>
    </div>
  )
}

export default Layout
