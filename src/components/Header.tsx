import React from 'react';
import css from '../App.module.less'
import { Link } from 'dva/router';

const Header: React.FunctionComponent = () => {
  return (
    <div className="Header">
      <ul className={css.Nav}>
        <li><Link className={css.NavMenu} to="/"><span role="img" aria-label="ok">👌</span></Link></li>
        <li><Link className={css.NavMenu} to="/">Home</Link></li>
        <li><Link className={css.NavMenu} to="/about">About</Link></li>
        <li><Link className={css.NavMenu} to="/create">Create</Link></li>
      </ul>
    </div>
  )
}

export default Header
