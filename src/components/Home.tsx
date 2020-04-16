import React from 'react';
import css from '../App.module.less'
import Category from '../routes/Category';

const Home = () => (
  <div>
    <h1 className={css.CategoryHeader}>My Blog</h1>
    <Category/>
  </div>
)

export default Home
